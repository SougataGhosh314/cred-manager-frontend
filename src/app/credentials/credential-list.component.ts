// src/app/credentials/credential-list.component.ts

import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CredentialService } from './credential.service';
import { Credential } from '../models/credential';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../core/notification/notification.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, QuickFilterModule } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ThemeService } from '../shared/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credential-list',
  templateUrl: './credential-list.component.html',
  styleUrls: ['./credential-list.component.css'],
  standalone: true,
  imports: [NgIf, NgClass, RouterModule, AgGridModule]
})
export class CredentialListComponent implements OnInit {
  credentials: Credential[] = [];
  loading = true;
  error: string | null = null;
  columnDefs: ColDef[] = []; // column definitions for ag-Grid
  gridOptions = {}; // for grid configuration
  modules = [ClientSideRowModelModule, QuickFilterModule];

  gridApi: any;

  currentTheme: string; // Default theme
  private themeSubscription!: Subscription;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onQuickFilterChanged(searchValue: string) {
    this.gridApi!.setGridOption('quickFilterText', searchValue);
  }

  constructor(
    private credentialService: CredentialService, 
    private authService: AuthService,
    private notificationService: NotificationService, 
    private router: Router,
    private ngZone: NgZone,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit() {
    // Setting initial theme **before** first render
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.isDarkMode$.subscribe((isDark) => {
      this.currentTheme = isDark ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';
    });

    this.loading = true;
    this.credentialService.getAll().subscribe({
      next: data => {
        this.credentials = data;
        this.loading = false;
        this.createColumnDefs(); // Call function to define columns once data is loaded
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = 'Failed to load credentials.';
        this.loading = false;
        this.notificationService.show('Failed to load credentials. Please try again later.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  createColumnDefs() {
    this.columnDefs = [
      { headerName: 'Title', field: 'title', sortable: true, filter: true, resizable: true, cellRenderer: this.linkRenderer.bind(this) },
      { headerName: 'Username', field: 'username', sortable: true, filter: true, resizable: true },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, resizable: true },
      // Add more columns as needed from your Credential model
    ];
  }

  linkRenderer(params: any) {
    return `<a href="/credentials/${params.data.id}">${params.value}</a>`;
  }

  onRowClicked(event: any) {
    this.router.navigate(['/credentials', event.data.id]);
  }

  confirmDeleteAccount() {
    const confirmed = confirm(
      'If you delete your account you will lose all your stored credentials. This action cannot be undone. Are you sure you wish to continue?'
    );
  
    if (confirmed) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        },
        error: () => {
          this.notificationService.show('Failed to delete account. Please try again.');
        }
      });
    }
  }
  
}
