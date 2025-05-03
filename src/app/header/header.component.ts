import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../shared/theme.service';
import { Subscription } from 'rxjs';

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
  ) {}

  ngOnInit(): void {
    // Initialize the current theme based on stored preference
    this.isDarkMode = this.themeService.getStoredTheme();

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.getStoredTheme();
  }  
}
