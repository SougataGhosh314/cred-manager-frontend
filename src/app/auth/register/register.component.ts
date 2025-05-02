// src/app/auth/register.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private ngZone: NgZone
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/credentials']);
          });
        }, 100); // 100ms is usually enough
      },
      error: err => {
        this.errorMessage = 'Registration failed. Try a different username.';
        this.loading = false;
      }
    });
  }
}
