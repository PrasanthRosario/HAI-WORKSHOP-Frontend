import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequest, SignupResponse } from './signup.interface';
import { environment } from '../../environments/environment';

/**
 * Service responsible for handling user signup-related operations
 * @Injectable decorator marks this class as available to be provided and injected as a dependency
 */
@Injectable({
  providedIn: 'root' // Service is provided at the root level, making it available throughout the application
})
export class SignupService {
  /**
   * API endpoint URL for signup operations, constructed using the environment configuration
   */
  private apiUrl = `${environment.apiUrl}/api/auth/signup`;

  /**
   * Constructor for SignupService
   * @param http - HttpClient instance for making HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Sends a signup request to the server
   * @param request - SignupRequest object containing user registration data
   * @returns Observable<SignupResponse> - Observable that emits the signup response from the server
   */
  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.apiUrl, request);
  }

  /**
   * Checks if a username is available for registration
   * @param username - The username to check for availability
   * @returns Observable<{available: boolean}> - Observable that emits the availability status
   */
  checkUsernameAvailability(username: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/check-username/${username}`);
  }
}