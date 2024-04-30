import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../dto/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public static baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  // Login an existing user
  login(username: string, password: string) {
    return this.httpClient.post<{ user: User; accessToken: string }>(
      `${UserService.baseUrl}/login`,
      {
        username,
        password,
      }
    );
  }

  // Register a new user
  register(username: string, password: string) {
    return this.httpClient.post<{ user: User; accessToken: string }>(
      `${UserService.baseUrl}/register`,
      {
        username,
        password,
      }
    );
  }
}
