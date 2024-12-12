import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  validateForm!: FormGroup;
  private ticketReleaseSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      releaseRate: [null, [Validators.required]],
      numberOfTickets: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.ticketReleaseSubscription) {
      this.ticketReleaseSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  postTicketAd(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(i)) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }

    const formData = new FormData();
    formData.append('title', this.validateForm.get('title')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    formData.append('releaseRate', this.validateForm.get('releaseRate')?.value);
    formData.append('numberOfTickets', this.validateForm.get('numberOfTickets')?.value);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    const userId = 14; // Replace with the actual user ID

    this.adminService.postAd(userId, formData).subscribe(res => {
      this.showSuccessModal();
      this.router.navigateByUrl('/home'); // Navigate to AllTicketsComponent
    }, error => {
      this.showErrorModal(error);
    });
  }

  startTicketRelease(): void {
    const releaseRate = this.validateForm.get('releaseRate')?.value;
    if (releaseRate) {
      this.ticketReleaseSubscription = interval(releaseRate * 1000).subscribe(() => {
        // Logic to increase ticket count
        const ticketId = 1; // Replace with the actual ticket ID
        this.adminService.increaseTicketCount(ticketId).subscribe();
      });
    }
  }

  stopTicketRelease(): void {
    if (this.ticketReleaseSubscription) {
      this.ticketReleaseSubscription.unsubscribe();
      this.ticketReleaseSubscription = null;
    }
  }

  showSuccessModal(): void {
    this.modal.success({
      nzTitle: 'Success',
      nzContent: 'Ticket added successfully!',
      nzCentered: true,
      nzStyle: { backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' },
      nzClassName: 'custom-modal'
    });
  }

  showErrorModal(error: any): void {
    this.modal.error({
      nzTitle: 'Error',
      nzContent: `${error}`,
      nzCentered: true,
      nzStyle: { backgroundColor: '#fff1f0', border: '1px solid #ffa39e' },
      nzClassName: 'custom-modal'
    });
  }
}