/**
 * Dashboard Component
 * Main component for the application dashboard that handles navigation, user menu,
 * theme switching, and search functionality.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    // Animation for fading in elements with a slight upward movement
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Animation for elements that both fade in and out with a slight vertical movement
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  /** Current user's username */
  username: string = '';
  /** User's role in the system */
  role: string = '';
  /** Search input value */
  searchQuery: string = '';
  /** Number of items in the shopping cart */
  cartItemCount: number = 0;
  /** Controls the visibility of the user menu dropdown */
  showUserMenu: boolean = false;
  /** Controls the visibility of the navigation menu (for mobile) */
  isNavOpen: boolean = false;
  /** Observable for tracking the current theme state */
  isDarkMode$: Observable<boolean>;

  /**
   * Constructor initializes the dashboard component
   * @param router - Angular Router service for navigation
   * @param themeService - Service for managing application theme
   */
  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    // Retrieve user data from localStorage if available
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.username = user.username;
      this.role = user.role;
    }
  }

  /**
   * Lifecycle hook that runs on component initialization
   */
  ngOnInit(): void {
    // Initialize cart count, etc.
  }

  /**
   * Handles the search functionality when user submits search
   */
  onSearch(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.showUserMenu = false;
  }

  /**
   * Toggles the mobile navigation menu
   */
  toggleNavbar(): void {
    this.isNavOpen = !this.isNavOpen;
    if (this.isNavOpen) {
      this.showUserMenu = false;
    }
  }

  /**
   * Toggles the user menu dropdown
   */
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  /**
   * Handles user logout by clearing localStorage and redirecting to login page
   */
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}