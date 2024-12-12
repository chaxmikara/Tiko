import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Ticket {
    id: number;
    title: string;
    description: string;
    price: number;
    numberOfTickets: number;
    returnedImg: string;
}

export interface Buyer {
    id: number;
    firstName: string;
    phoneNumber: string;
    price: number;
    timestamp: string;
    ticketId: number;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:8080/api/admin';

    constructor(private http: HttpClient, private authService: AuthService) { }

    postTicketAdd(formData: FormData): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/postTicketAdd/1`, formData, { headers }) // Replace 1 with the actual user ID
            .pipe(
                catchError(this.handleError)
            );
    }

    getAllTicketAdds(userId: number): Observable<Ticket[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<Ticket[]>(`${this.apiUrl}/ticket/${userId}`, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

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

    getBuyers(): Observable<Buyer[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<Buyer[]>(`${this.apiUrl}/buyers`, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    getBuyersByTicketId(ticketId: number): Observable<Buyer[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<Buyer[]>(`${this.apiUrl}/buyers/${ticketId}`, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteTicket(ticketId: number): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.delete<void>(`${this.apiUrl}/ticket/${ticketId}`, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    increaseTicketCount(ticketId: number): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<void>(`${this.apiUrl}/increaseTicketCount/${ticketId}`, {}, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    postToClientDashboard(ticket: Ticket): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<void>(`${this.apiUrl}/postToClientDashboard`, ticket, { headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    getTicketById(ticketId: number): Observable<Ticket> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<Ticket>(`${this.apiUrl}/ticketById/${ticketId}`, { headers })
            .pipe(
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