// src/app/credentials/credential-list.component.ts

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CredentialService } from './credential.service';
import { Credential } from '../models/credential';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../core/notification/notification.service';

@Component({
  selector: 'app-credential-list',
  templateUrl: './credential-list.component.html',
  styleUrls: ['./credential-list.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, RouterModule]
})
export class CredentialListComponent implements OnInit {
  credentials: Credential[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private credentialService: CredentialService, 
    private authService: AuthService,
    private notificationService: NotificationService, 
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loading = true;
    this.credentialService.getAll().subscribe({
      next: data => {
        this.credentials = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load credentials.';
        this.loading = false;
      }
    });
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
