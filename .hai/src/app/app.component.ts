/**
 * Root component of the Angular application that handles theme switching functionality
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** Flag to track the current theme mode (dark/light) */
  isDarkMode = false;

  /**
   * Lifecycle hook that runs when the component initializes
   * Checks the system's color scheme preference and sets the theme accordingly
   */
  ngOnInit() {
    // Check if the system prefers dark mode using media query
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.toggleTheme(true);
    }
  }

  /**
   * Toggles between dark and light themes
   * @param isDark Optional boolean parameter to explicitly set dark/light mode
   *              If not provided, it toggles the current mode
   */
  toggleTheme(isDark?: boolean) {
    // Set isDarkMode based on parameter or toggle current value
    this.isDarkMode = isDark ?? !this.isDarkMode;
    // Update the data-theme attribute on the root element to trigger theme change
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}