import { Component, EventEmitter, OnInit } from '@angular/core';
import { GameFieldComponent } from './game-field/game-field.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameFieldComponent, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  static readonly cross = 'X';
  static readonly circle = 'O';

  // Figure of the current player
  figure?: string;

  isWaiting = true;
  winnerMsg?: string;

  resetField = new EventEmitter<void>();

  ngOnInit() {
    this.connect();
  }

  private connect() {
    // TODO fetch if two players are connected via socket
    this.figure = GameComponent.cross;
    this.isWaiting = false;
    this.resetField.emit();
  }

  // Called when the state of the game field changes
  fieldStateChange(figure: string, isWin: boolean, isDraw: boolean) {
    if (isWin) {
      this.winnerMsg =
        figure === this.figure
          ? 'Congratulations, you won the game!'
          : 'You lost, better luck next time!';
    } else if (isDraw) {
      this.winnerMsg = "It's a draw!";
    } else {
      // TODO remove - just for testing purposes
      this.figure =
        this.figure === GameComponent.cross
          ? GameComponent.circle
          : GameComponent.cross;
    }
  }

  // Start a new game
  newGame() {
    this.winnerMsg = undefined;
    this.connect();
  }
}
