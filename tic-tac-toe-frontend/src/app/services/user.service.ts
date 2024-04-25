import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  // Register a new user
  register(username: string, password: string) {
    return this.httpClient.post(`${UserService.baseUrl}/register`, {
      username,
      password,
    });
  }
}
