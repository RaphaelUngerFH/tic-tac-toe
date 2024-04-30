import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GameFieldComponent } from './game-field/game-field.component';
import { MatButtonModule } from '@angular/material/button';
import { GameSocketService } from '../../services/game-socket.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameFieldComponent, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  static readonly cross = 'X';
  static readonly circle = 'O';

  // Game figure of the current player
  figure?: string;

  // Boolean variables to handle waiting and disable the game field if its the opponent's turn
  isWaiting = true;
  isOpponent = true;

  winnerMsg?: string;

  resetField = new EventEmitter<void>();

  unsubscribe = new Subject();

  constructor(
    private gameSocketService: GameSocketService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.gameSocketService.connect();
    this.gameSocketService
      .listenToConnectionState()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((connected) => {
        // The first connected player starts with X
        if (connected === 1) {
          this.isOpponent = false;
          this.figure = GameComponent.cross;
        } else if (!this.figure && connected === 2)
          this.figure = GameComponent.circle;

        // Automatically declare a player as a winner if the other one leaves
        if (!this.isWaiting && connected !== 2) this.fieldStateChange(true);
        else this.isWaiting = connected !== 2; // Wait until both players are connected
      });
  }

  // Called when the state of the game field changes and automatically disconnects after the game is finished
  fieldStateChange(isWin?: boolean, isDraw?: boolean) {
    if (isWin || isWin === false) {
      this.winnerMsg = isWin
        ? 'Congratulations, you won the game!'
        : 'You lost, better luck next time!';
      this.gameSocketService.disconnect();
    } else if (isDraw) {
      this.winnerMsg = "It's a draw!";
      this.gameSocketService.disconnect();
    }
  }

  // Start a new game
  newGame() {
    this.figure = undefined;
    this.winnerMsg = undefined;
    this.isOpponent = true;
    this.isWaiting = true;
    this.resetField.emit();
    this.gameSocketService.connect();
  }

  // Logout from the current session
  logout() {
    this.gameSocketService.disconnect();
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(undefined);
    this.unsubscribe.complete();
  }
}
