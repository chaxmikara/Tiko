import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:8080/api/admin'; // Use http if your backend is running on http

    constructor(private http: HttpClient, private authService: AuthService) { } // Inject AuthService

    postAd(userId: number, formData: FormData): Observable<any> {
        const headers = this.authService.getAuthHeaders(); // Get auth headers from AuthService

        return this.http.post(`${this.apiUrl}/postTicketAdd/${userId}`, formData, { headers });
    }
}