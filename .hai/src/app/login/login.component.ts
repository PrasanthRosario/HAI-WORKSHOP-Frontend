/**
 * Login Component
 * Handles user authentication and login functionality
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { LoginError } from './login.interface';
import { LoginService } from './login.service';
import { ModalService } from '../shared/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // Animation configuration for fade in/out effects
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  /** Form group for login credentials */
  loginForm: FormGroup;
  /** Error message to display to user */
  errorMessage: string = '';
  /** Loading state indicator */
  isLoading: boolean = false;

  /**
   * Constructor initializes required services and form
   * @param formBuilder - Service for building reactive forms
   * @param loginService - Service handling authentication
   * @param router - Service for navigation
   * @param modalService - Service for displaying modal messages
   */
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private modalService: ModalService
  ) {
    // Initialize login form with validation
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Lifecycle hook that checks if user is already logged in
   */
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Handles form submission
   * Validates form and attempts login if valid
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            const { role } = response.user;
            this.modalService.showModal({
              type: 'success',
              message: 'Login successful! Redirecting...'
            });
            
            // Add animation delay before navigation
            setTimeout(() => {
              // Redirect based on user role
              if (role === 'admin') {
                this.router.navigate(['/admin/dashboard']);
              } else {
                this.router.navigate(['/user/dashboard']);
              }
            }, 800);
          }
        },
        error: (error: LoginError) => {
          this.modalService.showModal({
            type: 'error',
            message: error.message
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  /**
   * Recursively marks all controls in a form group as touched
   * @param formGroup - The form group to mark as touched
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Gets error message for form control
   * @param controlName - Name of the form control
   * @returns Error message string
   */
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}