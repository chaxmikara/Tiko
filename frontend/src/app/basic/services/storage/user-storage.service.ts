import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    try {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    } catch (e) {
      console.error('Error saving token to localStorage', e);
    }
  }

  static getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN);
    } catch (e) {
      console.error('Error getting token from localStorage', e);
      return null;
    }
  }

  public saveUser(user: any): void {
    try {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  }

  static getUser(): any {
    try {
      const user = localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error getting user from localStorage', e);
      return null;
    }
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isClientLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CLIENT';
  }

  static isCompanyLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'COMPANY';
  }

  static signOut(): void {
    try {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    } catch (e) {
      console.error('Error signing out', e);
    }
  }
}