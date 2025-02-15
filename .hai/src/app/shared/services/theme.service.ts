/**
 * Service responsible for managing the application's theme (dark/light mode).
 * Uses BehaviorSubject to maintain and broadcast theme state changes across the application.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** BehaviorSubject to track the current theme state */
  private isDarkMode = new BehaviorSubject<boolean>(false);
  
  /** Observable to allow components to subscribe to theme changes */
  isDarkMode$ = this.isDarkMode.asObservable();

  /**
   * Initializes the theme service by:
   * 1. Checking local storage for saved theme preference
   * 2. If no saved preference, checks system's color scheme preference
   * 3. Applies the determined theme
   */
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

  /**
   * Toggles between dark and light theme
   * Updates the theme state, applies the new theme, and saves preference to local storage
   */
  toggleTheme(): void {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  /**
   * Applies the theme by toggling CSS classes on the document body
   * @param isDark - Boolean indicating whether to apply dark theme
   */
  private applyTheme(isDark: boolean): void {
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
  }
}