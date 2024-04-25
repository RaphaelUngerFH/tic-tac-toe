import { Injectable } from '@angular/core';
import { User } from '../dto/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: User;
  private isLoggedIn = false;

  constructor() {}

  login(user: User) {
    this.user = user;
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  // Get if a user is currently logged in
  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Get the session id based on basic authentication
  getSessionId() {
    return this.user ? btoa(`${this.user.username}:${this.user.password}`) : '';
  }
}
