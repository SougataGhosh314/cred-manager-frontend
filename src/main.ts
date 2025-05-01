import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// main.ts
const savedTheme = localStorage.getItem('theme');

if (
  savedTheme === 'dark' ||
  (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
