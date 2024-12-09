import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';  // URL of the backend API

  constructor(private http: HttpClient) { }

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Login user and save JWT token and user ID to localStorage
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Ensure localStorage is accessible in the browser
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user_role', response.role);
            localStorage.setItem('user_id', response.userId); // Store user ID
          }
        }
      })
    );
  }

  // Create authorization headers with JWT token for authenticated requests
  getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' && window.localStorage
      ? localStorage.getItem('auth_token')
      : null;
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Retrieve the user ID from localStorage or return a hardcoded value for testing
  getUserId(): string | null {
    // Temporarily return a hardcoded user ID for testing
    return '14';
  }

  // Check if the user is logged in based on the presence of a JWT token
  isLoggedIn(): boolean {
    // Ensure localStorage is accessible in the browser
    return typeof window !== 'undefined' && window.localStorage
      ? !!localStorage.getItem('auth_token')
      : false;  // Return false if localStorage is not available
  }

  // Logout the user by removing the JWT token and user ID from localStorage
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id'); // Remove user ID
    }
  }

  // Fetch user data using the JWT token
  getUserData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { headers: this.getAuthHeaders() });
  }
}