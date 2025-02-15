import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  private readonly darkThemeVars = {
    '--bg-color': '#1a1a1a',
    '--text-color': '#fff',
    '--card-bg': '#2d2d2d',
    '--border-color': '#444',
    '--input-bg': '#333',
    '--input-text': '#fff',
    '--input-placeholder': '#888',
    '--label-color': '#ccc',
    '--button-bg': '#007bff',
    '--button-text': '#fff',
    '--button-hover': '#0056b3',
    '--link-color': '#66b3ff',
    '--link-hover': '#99ccff',
    '--error-color': '#ff6b6b',
    '--success-color': '#51cf66',
    '--hover-color': '#444'
  };

  private readonly lightThemeVars = {
    '--bg-color': '#f5f5f5',
    '--text-color': '#333',
    '--card-bg': '#fff',
    '--border-color': '#ddd',
    '--input-bg': '#fff',
    '--input-text': '#333',
    '--input-placeholder': '#666',
    '--label-color': '#555',
    '--button-bg': '#007bff',
    '--button-text': '#fff',
    '--button-hover': '#0056b3',
    '--link-color': '#007bff',
    '--link-hover': '#0056b3',
    '--error-color': '#dc3545',
    '--success-color': '#28a745',
    '--hover-color': '#f0f0f0'
  };

  constructor() {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.next(savedTheme === 'dark');
      this.applyTheme(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.next(prefersDark);
      this.applyTheme(prefersDark);
    }
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    const themeVars = isDark ? this.darkThemeVars : this.lightThemeVars;
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
}
