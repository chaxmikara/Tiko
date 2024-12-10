import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AllTicketsComponent } from './components/all-tickets/all-tickets.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';

import { AuthService } from './services/auth.service';
import { LogService } from './services/log.service';
import { AdminService } from './services/admin.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoNgZorroAntdModule } from './DemoNgZorroAndModule';

const icons = [UserOutline, LockOutline];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashboardComponent,
    AllTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzGridModule,
    RouterModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzNotificationModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule
  ],
  providers: [
    AuthService,
    LogService,
    AdminService,
    { provide: NZ_ICONS, useValue: [UserOutline, LockOutline] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }