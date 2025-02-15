import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  LoginCredentials,
  LoginError,
  LoginResponse,
  UserSession,
} from './login.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<UserSession> {
    return this.http.post<UserSession>(this.apiUrl, credentials).pipe(
      tap((response) => {
        if (response.success) {
          // Store user data
          localStorage.setItem('user', JSON.stringify(response));
          // Store session flag
          localStorage.setItem('isLoggedIn', 'true');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 401) {
        errorMessage = 'Invalid username or password';
      } else {
        errorMessage =
          error.error?.error || error.error?.message || 'Server error';
      }
    }

    return throwError(
      () =>
        ({
          message: errorMessage,
          statusCode: error.status,
        } as LoginError)
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getCurrentUser(): UserSession | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
