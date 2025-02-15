import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequest, SignupResponse } from './signup.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = `${environment.apiUrl}/api/auth/signup`;

  constructor(private http: HttpClient) { }

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.apiUrl, request);
  }

  checkUsernameAvailability(username: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/check-username/${username}`);
  }
}
