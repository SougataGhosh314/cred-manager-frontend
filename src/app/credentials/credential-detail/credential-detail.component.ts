import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CredentialService } from '../credential.service';
import { Credential } from '../../models/credential';

@Component({
  selector: 'app-credential-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './credential-detail.component.html',
})
export class CredentialDetailComponent implements OnInit {
  credential?: Credential;
  error = '';
  loading = true;
  showPassword = false;
  password = '';
  passwordLoading = false;

  constructor(
    private route: ActivatedRoute, 
    private credentialService: CredentialService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      this.error = 'Invalid credential ID.';
      this.loading = false;
      return;
    }

    this.credentialService.getById(id).subscribe({
      next: data => {
        this.credential = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load credential';
        this.loading = false;
      }
    });
  }

  togglePassword(): void {
    if (!this.credential) return;

    if (this.password) {
      // Toggle visibility only if password is already fetched
      this.showPassword = !this.showPassword;
    } else {
      // Fetch password
      this.passwordLoading = true;
      this.credentialService.getDecryptedPassword(this.credential.id!).subscribe({
        next: (data) => {
          this.password = data;
          this.showPassword = true;
          this.passwordLoading = false;
        },
        error: () => {
          this.error = 'Failed to fetch password.';
          this.passwordLoading = false;
        }
      });
    }
  }

  deleteCredential(): void {
    if (!this.credential?.id) return; // Guard check to avoid undefined access
    if (!confirm('Are you sure you want to delete this credential?')) return;
  
    this.credentialService.delete(this.credential.id!).subscribe({
      next: () => this.router.navigate(['/credentials']),
      error: () => alert('Failed to delete credential.')
    });
  }
}
