import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GameSocketService {
  private socket = io(UserService.baseUrl);

  connect() {
    if (this.socket.disconnected) this.socket.connect();
  }

  getId() {
    return this.socket.id;
  }

  listenToConnectionState() {
    return this.listen('connectionState');
  }

  listenToGameState() {
    return this.listen('gameState');
  }

  // Listen to the game state
  private listen(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  // Emit the new game board
  emit(row: number, col: number): void {
    this.socket.emit('move', { row, col });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
