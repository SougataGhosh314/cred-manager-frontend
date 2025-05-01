// src/app/credentials/credential-list.component.ts

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CredentialService } from './credential.service';
import { Credential } from '../models/credential';

@Component({
  selector: 'app-credential-list',
  templateUrl: './credential-list.component.html',
  styleUrls: ['./credential-list.component.css'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class CredentialListComponent implements OnInit {
  credentials: Credential[] = [];
  loading = true;
  error: string | null = null;

  constructor(private credentialService: CredentialService) {}

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
}
