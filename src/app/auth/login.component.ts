// src/app/auth/login.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const errorMsg = localStorage.getItem('auth-error-message');
    if (errorMsg) {
      this.message = errorMsg;
      localStorage.removeItem('auth-error-message');
    }
  }
  

  onSubmit(form: NgForm) {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/credentials']);
      },
      error: err => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.loading = false;
      }
    });
  }
}
