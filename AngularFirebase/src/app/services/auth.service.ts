import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private authenticated = false;
  constructor(
    private router: Router,
  ) {}

  get token() {
    return localStorage.getItem('token');
  }

  get user() {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null;
  }
  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  login(userData: any): any {
    
  }
  createUser(userData: any): any {
  
  }
  logout(): any {
    
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }
  autoAuthUser(): any {
    
  }

  private saveAuthData(token: string, expirationDate: Date, user: any) {
    delete user.expiresIn;
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(user));
  }
  private clearAuthData() {
    localStorage.clear();
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null;
    if (!token || !expirationDate || !user) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      user,
    };
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
