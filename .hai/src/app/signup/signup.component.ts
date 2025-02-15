/**
 * SignupComponent handles user registration functionality
 * This component provides a form for user signup with validation and error handling
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { ValidationErrors } from './signup.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // Form group for the signup form
  signupForm: FormGroup;
  // Flag to track form submission status
  isSubmitting = false;
  // Error message to display when signup fails
  errorMessage = '';
  // Success message to display when signup succeeds
  successMessage = '';
  // Object to store validation errors
  validationErrors: ValidationErrors = {};

  /**
   * Constructor initializes the signup form and sets up username availability checking
   * @param formBuilder - FormBuilder service for creating reactive forms
   * @param signupService - Service handling signup-related API calls
   * @param router - Router service for navigation
   */
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    // Initialize the signup form with validation rules
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Password must contain special char, number, and uppercase letter
        Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/)
      ]]
    });

    // Set up real-time username availability checking
    this.signupForm.get('username')?.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after last keystroke
      distinctUntilChanged(), // Only emit when value changes
      switchMap(username => this.signupService.checkUsernameAvailability(username))
    ).subscribe(
      result => {
        if (!result.available) {
          this.validationErrors.username = ['Username is already taken'];
        } else {
          this.validationErrors.username = [];
        }
      }
    );
  }

  ngOnInit(): void {}

  /**
   * Handles form submission
   * Validates the form and calls the signup service if valid
   */
  onSubmit(): void {
    if (this.signupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.signupService.signup(this.signupForm.value).subscribe(
        response => {
          this.isSubmitting = false;
          if (response.success) {
            this.successMessage = 'Signup successful! Redirecting to login...';
            this.signupForm.reset();
            // Redirect to login page after 1.5 seconds
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          } else {
            this.errorMessage = response.error || 'Signup failed. Please try again.';
          }
        },
        error => {
          this.isSubmitting = false;
          this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
        }
      );
    }
  }

  /**
   * Returns appropriate validation message for password field
   * @returns string containing the validation message
   */
  getPasswordValidationMessage(): string {
    const password = this.signupForm.get('password');
    if (password?.hasError('required')) {
      return 'Password is required';
    }
    if (password?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (password?.hasError('pattern')) {
      return 'Password must contain at least one special character, one number, and one uppercase letter';
    }
    return '';
  }
}