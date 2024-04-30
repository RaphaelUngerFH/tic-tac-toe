import { Injectable } from '@angular/core';
import { User } from '../dto/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken?: string;
  private isLoggedIn = false;

  constructor() {}

  login(accessToken: string) {
    this.accessToken = accessToken;
    this.isLoggedIn = true;
  }

  logout() {
    this.accessToken = undefined;
    this.isLoggedIn = false;
  }

  // Get if a user is currently logged in
  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Get the session id based on basic authentication
  getSessionId() {
    return this.accessToken;
  }
}
