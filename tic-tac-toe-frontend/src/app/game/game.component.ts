import { Component, OnInit } from '@angular/core';
import { GameFieldComponent } from './game-field/game-field.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameFieldComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  static readonly cross = 'X';
  static readonly circle = 'O';

  // Figure of the current player
  figure?: string;

  ngOnInit() {
    // TODO fetch if two players are connected via socket
    this.figure = GameComponent.cross;
  }

  // Called when the state of the game field changes
  fieldStateChange(figure: string, isWin: boolean) {
    console.log('figure: ', figure);
    console.log('isWin: ', isWin);

    // TODO remove - just for testing purposes
    this.figure =
      this.figure === GameComponent.cross
        ? GameComponent.circle
        : GameComponent.cross;
  }
}
