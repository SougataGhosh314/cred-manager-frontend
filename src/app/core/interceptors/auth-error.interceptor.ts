import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          localStorage.setItem('auth-error-message', 'Your session has expired. Please log in again.');
          authService.logout();
        }
      }
    })
  );
};
