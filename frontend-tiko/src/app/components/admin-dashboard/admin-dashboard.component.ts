import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service'; // Correct the import path

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
    private notification: NzNotificationService,
    private router: Router,
    private adminService: AdminService // Inject your service
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
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
    formData.append('Title', this.validateForm.get('serviceName')?.value);
    formData.append('Description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    const userId = 14; // Replace with the actual user ID

    this.adminService.postAd(userId, formData).subscribe(res => {
      this.notification.success(
        'SUCCESS',
        'Ad Posted Successfully!',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/admin/tickedadd');
    }, error => {
      this.notification.error(
        'ERROR',
        `${error.error}`,
        { nzDuration: 5000 }
      );
    });
  }
}