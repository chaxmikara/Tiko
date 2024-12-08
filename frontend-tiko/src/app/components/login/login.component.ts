import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: { username: string; password: string } = { username: '', password: '' };
  errorMessage: string = '';  

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private notification: NzNotificationService
  ) {}

  async login() {
    try {
      const user = await this.authService.login(this.credentials).toPromise();
      this.handleLoginSuccess(user);
    } catch (error) {
      this.handleLoginError(error);
    }
  }

  private handleLoginSuccess(user: any) {
    if (user && user.token) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('auth_token', user.token);
      }

      if (user.role === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.errorMessage = 'Login failed. You do not have the required role.';
      }
    } else {
      this.errorMessage = 'Login failed. Please check your credentials.';
    }
  }

  private handleLoginError(error: any) {
    console.error('Login error: ', error);
    this.errorMessage = 'Login failed. Please check your credentials.';
    
    this.notification.error(
      'ERROR',
      'Bad credentials. Please check your username and password.',
      {
        nzDuration: 5000,
        nzStyle: {
          backgroundColor: '#ff4d4f',
          color: 'white',              
          fontWeight: 'bold'           
        },
        nzPlacement: 'topRight'
      }
    );
  }
}