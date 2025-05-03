import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../shared/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDarkMode = false;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.isDarkModeSubject.value;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
    this.isDarkMode = this.themeService.isDarkModeSubject.value;
  }  
  
}
