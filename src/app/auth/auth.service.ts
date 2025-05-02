// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../core/notification/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth'; // Adjust to match backend
  private tokenKey = 'auth-token';

  // initialized based on localStorage token presence
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public notifyLogin() {
    this.loggedInSubject.next(true);
  }
  
  public notifyLogout() {
    this.loggedInSubject.next(false);
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`, { username, password }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.notifyLogin();
        this.notificationService.show('You have logged in successfully. Welcome!');
      })
    );
  }

  register(username: string, password: string): Observable<void> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { username, password })
    .pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.notifyLogin();
        this.notificationService.show('Account created successfully. Welcome!');
      }),
      map(() => {}) // convert Observable<{ token }> to Observable<void>
    );
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-account`).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.notificationService.show('Your account has been deleted.');
      })
    );
  }
  

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.notifyLogout();
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
