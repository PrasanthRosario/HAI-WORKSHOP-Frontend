/**
 * Service responsible for handling user authentication operations
 * including login, logout, and session management.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginCredentials, LoginResponse, LoginError, UserSession } from './login.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /** Base API URL for authentication endpoints */
  private readonly apiUrl = `${environment.apiUrl}/api/auth/login`;

  /**
   * Creates an instance of LoginService.
   * @param http - The HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Authenticates a user with provided credentials
   * @param credentials - The user's login credentials
   * @returns An Observable of the login response
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      map(response => {
        // Store user session in localStorage if login is successful
        if (response.success && response.user) {
          localStorage.setItem('userSession', JSON.stringify(response.user));
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors during authentication
   * @param error - The HTTP error response
   * @returns An Observable with the error details
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Handle client-side errors
      errorMessage = error.error.message;
    } else {
      // Handle server-side errors
      if (error.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.status === 429) {
        errorMessage = 'Too many login attempts. Please try again later.';
      } else {
        errorMessage = error.error?.message || 'Server error';
      }
    }

    return throwError(() => ({
      message: errorMessage,
      statusCode: error.status
    } as LoginError));
  }

  /**
   * Logs out the current user by removing their session
   */
  logout(): void {
    localStorage.removeItem('userSession');
  }

  /**
   * Checks if a user is currently logged in
   * @returns True if a user session exists, false otherwise
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userSession');
  }

  /**
   * Retrieves the current user's session information
   * @returns The user session object if it exists, null otherwise
   */
  getCurrentUser(): UserSession | null {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  }
}