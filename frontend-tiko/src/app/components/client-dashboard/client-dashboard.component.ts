import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminService, Ticket } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  tickets: Ticket[] = [];
  isBuyTicketModalVisible = false;
  selectedTicket: Ticket | null = null;
  buyTicketForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllTickets();
    this.buyTicketForm = this.fb.group({
      firstName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllTickets(): void {
    const userId = 14; // Replace with the actual user ID
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

  showBuyTicketForm(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.isBuyTicketModalVisible = true;
  }

  handleCancel(): void {
    this.isBuyTicketModalVisible = false;
    this.buyTicketForm.reset();
  }

  handleBuyTicket(): void {
    if (this.buyTicketForm.invalid) {
      for (const i in this.buyTicketForm.controls) {
        if (this.buyTicketForm.controls.hasOwnProperty(i)) {
          this.buyTicketForm.controls[i].markAsDirty();
          this.buyTicketForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }

    const buyerDetails = this.buyTicketForm.value;
    const ticketId = this.selectedTicket?.id;
    const price = this.selectedTicket?.price;

    if (ticketId && price) {
      this.adminService.buyTicket(ticketId, buyerDetails, price).subscribe({
        next: () => {
          this.message.success('Ticket purchased successfully');
          this.isBuyTicketModalVisible = false;
          this.buyTicketForm.reset();
          this.getAllTickets(); // Refresh the ticket list
        },
        error: (error) => {
          console.error('Error purchasing ticket:', error);
          this.message.error('Failed to purchase ticket. Please try again.');
        }
      });
    }
  }

  updateImg(img: string): string {
    if (!img) return 'assets/placeholder-image.jpg';
    return 'data:image/jpeg;base64,' + img;
  }
}