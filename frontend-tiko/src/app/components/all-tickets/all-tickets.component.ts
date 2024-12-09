import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Ticket } from '../../models/ticket.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit, OnDestroy {
  tickets: Ticket[] = [];
  isLoading = false;
  isDeleting: { [key: number]: boolean } = {};
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllTickets();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllTickets(): void {
    this.isLoading = true;
    this.adminService.getAllAdsByUserId()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Ticket[]) => {
          console.log('Fetched tickets:', res);
          this.tickets = res;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching tickets:', error);
          this.message.error('Failed to load tickets. Please try again later.');
          this.isLoading = false;
        }
      });
  }

  updateImg(img: string): string {
    if (!img) return 'assets/placeholder-image.jpg';
    return 'data:image/jpeg;base64,' + img;
  }

  deleteTicket(ticketId: number): void {
    this.isDeleting[ticketId] = true;

    this.adminService.deleteAd(ticketId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
          this.message.success('Ticket deleted successfully');
          delete this.isDeleting[ticketId];
        },
        error: (error) => {
          console.error('Error deleting ticket:', error);
          this.message.error('Failed to delete ticket. Please try again.');
          delete this.isDeleting[ticketId];
        }
      });
  }

  refreshTickets(): void {
    this.getAllTickets();
  }

  trackByTicketId(index: number, ticket: Ticket): number {
    return ticket.id;
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  confirmDelete(ticketId: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.deleteTicket(ticketId);
    }
  }

  hasTickets(): boolean {
    return this.tickets.length > 0;
  }

  sortTickets(sortBy: 'price' | 'title'): void {
    this.tickets = [...this.tickets].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a.title.localeCompare(b.title);
    });
  }

  searchTickets(searchTerm: string): void {
    if (!searchTerm) {
      this.getAllTickets();
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    this.tickets = this.tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTermLower) ||
      ticket.description.toLowerCase().includes(searchTermLower)
    );
  }
}