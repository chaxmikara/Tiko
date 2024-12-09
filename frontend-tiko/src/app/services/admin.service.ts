// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

// Interfaces
export interface Ticket {
    id: number;
    title: string;
    description: string;
    price: number;
    returnedImg: string;
    userId: number | null;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:8080/api/admin';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    // Create ticket
    postAd(userId: number, formData: FormData): Observable<ApiResponse<Ticket>> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<ApiResponse<Ticket>>(
            `${this.apiUrl}/postTicketAdd/${userId}`,
            formData,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Read tickets
    getAllAdsByUserId(): Observable<Ticket[]> {
        const userId = this.authService.getUserId();
        if (!userId) {
            throw new Error('User ID is null');
        }
        const headers = this.authService.getAuthHeaders();

        return this.http.get<Ticket[]>(
            `${this.apiUrl}/ticket/${userId}`,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Get single ticket
    getTicketById(ticketId: number): Observable<Ticket> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<Ticket>(
            `${this.apiUrl}/ticket/single/${ticketId}`,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Update ticket
    updateTicket(ticketId: number, formData: FormData): Observable<ApiResponse<Ticket>> {
        const headers = this.authService.getAuthHeaders();
        return this.http.put<ApiResponse<Ticket>>(
            `${this.apiUrl}/ticket/${ticketId}`,
            formData,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Delete ticket
    deleteAd(ticketId: number): Observable<ApiResponse<void>> {
        const headers = this.authService.getAuthHeaders();
        return this.http.delete<ApiResponse<void>>(
            `${this.apiUrl}/ticket/${ticketId}`,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Error handler
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

    // Helper method to handle form data
    createTicketFormData(ticket: Partial<Ticket>, file?: File): FormData {
        const formData = new FormData();
        if (ticket.title) formData.append('title', ticket.title);
        if (ticket.description) formData.append('description', ticket.description);
        if (ticket.price) formData.append('price', ticket.price.toString());
        if (file) formData.append('img', file);
        return formData;
    }
}