import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      releaseRate: [null, [Validators.required]],
      numberOfTickets: [null, [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as File);
  }

  postTickeetAd() {
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile as File);
    formData.append('title', this.validateForm.get('serviceName')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    formData.append('releaseRate', this.validateForm.get('releaseRate')?.value);
    formData.append('numberOfTickets', this.validateForm.get('numberOfTickets')?.value);

    const userId = 14; // Replace with the actual user ID

    this.adminService.postAd(userId, formData).subscribe(res => {
      this.showSuccessModal();
      this.router.navigateByUrl('/all-tickets'); // Navigate to AllTicketsComponent
    }, error => {
      this.showErrorModal(error);
    });
  }

  showSuccessModal() {
    this.modal.success({
      nzTitle: 'SUCCESS',
      nzContent: 'Ad Posted Successfully!',
      nzCentered: true,
      nzStyle: { backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' },
      nzClassName: 'custom-modal'
    });
  }

  showErrorModal(error: any) {
    this.modal.error({
      nzTitle: 'ERROR',
      nzContent: `${error}`,
      nzCentered: true,
      nzStyle: { backgroundColor: '#fff1f0', border: '1px solid #ffa39e' },
      nzClassName: 'custom-modal'
    });
  }
}