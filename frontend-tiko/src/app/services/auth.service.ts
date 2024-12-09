import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }


  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {

          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user_role', response.role);
          }
        }
      })
    );
  }



  public getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' && window.localStorage
      ? localStorage.getItem('auth_token')
      : null;
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }


  isLoggedIn(): boolean {

    return typeof window !== 'undefined' && window.localStorage
      ? !!localStorage.getItem('auth_token')
      : false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
    }
  }


  getUserData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { headers: this.getAuthHeaders() });
  }
}
