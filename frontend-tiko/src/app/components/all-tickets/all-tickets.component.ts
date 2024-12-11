import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminService, Ticket } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    const userId = 14;
    this.adminService.getAllAdsByUserId(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Ticket[]) => {
          this.tickets = res;
        },
        error: (error) => {
          this.message.error('Failed to load tickets. Please try again later.');
        }
      });
  }

  updateImg(img: string): string {
    if (!img) return 'assets/placeholder-image.jpg';
    return 'data:image/jpeg;base64,' + img;
  }

  startTicketing(ticketId: number): void {
    this.adminService.getTicketById(ticketId).subscribe({
      next: (ticket: Ticket) => {
        this.adminService.postToClientDashboard(ticket).subscribe({
          next: () => {
            this.message.success('Ticket started successfully');
          },
          error: (error) => {
            console.error('Error starting ticket:', error);
            this.message.error('Failed to start ticket. Please try again.');
          }
        });
      },
      error: (error) => {
        console.error('Error fetching ticket:', error);
        this.message.error('Failed to fetch ticket. Please try again.');
      }
    });
  }

  stopTicketing(ticketId: number): void {
    this.adminService.increaseTicketCount(ticketId).subscribe({
      next: () => {
        this.message.success('Ticket count increased successfully');
      },
      error: (error) => {
        console.error('Error increasing ticket count:', error);
        this.message.error('Failed to increase ticket count. Please try again.');
      }
    });
  }

  deleteTicket(ticketId: number): void {
    this.isDeleting[ticketId] = true;

    this.adminService.deleteTicket(ticketId)
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
}