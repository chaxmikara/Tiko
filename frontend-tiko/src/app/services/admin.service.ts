import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
    numberOfTickets: number;
    releaseRate: number;
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
    getAllAdsByUserId(userId: number): Observable<Ticket[]> {
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
            `${this.apiUrl}/ticket/${ticketId}`,
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
    deleteTicket(ticketId: number): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.delete<void>(
            `${this.apiUrl}/ticket/${ticketId}`,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Increase ticket count
    increaseTicketCount(ticketId: number): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<void>(
            `${this.apiUrl}/increaseTicketCount/${ticketId}`,
            {},
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Post ticket to client dashboard
    postToClientDashboard(ticket: Ticket): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<void>(
            `${this.apiUrl}/postToClientDashboard`,
            ticket,
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Buy ticket
    buyTicket(ticketId: number, buyerDetails: any, price: number): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<void>(
            `${this.apiUrl}/buyTicket`,
            { ticketId, buyerDetails, price },
            { headers }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Handle errors
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}