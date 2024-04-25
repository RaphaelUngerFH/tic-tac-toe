import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class GameSocketService {
  private socket = io('http://localhost:3000');

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
  listen(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  // Emit the new game board
  emit(data: [][]): void {
    this.socket.emit('move', data);
  }
}
