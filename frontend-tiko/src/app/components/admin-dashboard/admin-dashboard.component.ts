import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, Buyer } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';
  buyers: Buyer[] = []; // Add the buyers property
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      releaseRate: [null, [Validators.required]],
      numberOfTickets: [null, [Validators.required]],
      date: [null, [Validators.required]], // Add date field
      img: [null, [Validators.required]]
    });

    this.getBuyers(); // Fetch buyers data on initialization
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    formData.append('date', this.validateForm.get('date')?.value);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    const userId = 14; // Replace with the actual user ID

    this.adminService.postTicketAdd(formData).subscribe(res => {
      this.message.success('Ticket added successfully');
      this.validateForm.reset();
      this.imagePreview = '';
    }, error => {
      this.message.error('Failed to add ticket');
      console.error(error);
    });
  }

  getBuyers(): void {
    this.adminService.getBuyers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Buyer[]) => {
          this.buyers = res;
        },
        error: (error) => {
          this.message.error('Failed to load buyers. Please try again later.');
        }
      });
  }
}