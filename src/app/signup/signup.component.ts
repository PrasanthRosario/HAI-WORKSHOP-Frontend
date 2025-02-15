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
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  validationErrors: ValidationErrors = {};

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/)
      ]]
    });

    // Check username availability as user types
    this.signupForm.get('username')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
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
