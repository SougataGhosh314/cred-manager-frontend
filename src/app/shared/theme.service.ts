// src/app/core/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  toggleDarkMode() {
    const newValue = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newValue);
    const html = document.documentElement;
    html.classList.toggle('dark', newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
  }

  getInitialTheme(): boolean {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      return true;
    } else if (storedTheme === 'light') {
      return false;
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }
}