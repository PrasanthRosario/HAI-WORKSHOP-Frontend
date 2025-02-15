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
  private readonly apiUrl = `${environment.apiUrl}/api/auth/login`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      map(response => {
        if (response.success && response.user) {
          localStorage.setItem('userSession', JSON.stringify(response.user));
        }
        return response;
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

  logout(): void {
    localStorage.removeItem('userSession');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userSession');
  }

  getCurrentUser(): UserSession | null {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  }
}
