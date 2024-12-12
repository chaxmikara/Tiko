import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private router: Router) { }

  navigateToTickets(): void {
    this.router.navigate(['/client-dashboard']);
  }

  navigateToVendorLogin(): void {
    this.router.navigate(['/login']);
  }
}