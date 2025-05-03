// src/app/shared/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getStoredTheme());
  isDarkMode$ = this.darkModeSubject.asObservable();

  toggleTheme(): void {
    const newDarkMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  }

  public getStoredTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }

  getCurrentTheme(): 'ag-theme-quartz-dark' | 'ag-theme-quartz' {
    return this.getStoredTheme() ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';
  }
}