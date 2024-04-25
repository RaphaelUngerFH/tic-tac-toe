import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timer } from './timer';

@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css',
})
export class GameFieldComponent implements OnInit {
  @Input() figure?: string;
  @Input() reset = new EventEmitter<void>();

  // Triggered after any game field changes and if the game is won with a certain figure
  @Output() change = new EventEmitter<{
    figure: string;
    isWin: boolean;
    isDraw: boolean;
  }>();

  // Game field
  field: (string | undefined)[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  timer = new Timer();

  // True, if it's the oppenent's turn
  isOpponent = false;

  ngOnInit() {
    // TODO listen on changes from the opponent and update the field

    this.timer.start();

    // Reset field
    this.reset.subscribe((_) => {
      this.timer.reset();
      this.field = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ];
      this.timer.start();
    });
  }

  // Set the game figure on a specific field
  set(row: number, col: number, figure?: string) {
    if (!this.field[row][col] && figure) {
      this.field[row][col] = figure;
      const isWin = this.isWin(figure);
      const isDraw =
        !isWin && this.field.every((row) => row.every((item) => item));

      this.change.emit({ figure, isWin, isDraw });
    }
  }

  // Check whether the current figure won the game
  private isWin(figure: string) {
    const allSame = (arr: (string | undefined)[]) =>
      arr.every((val) => val === figure);

    // Check rows & columns
    for (let i = 0; i < this.field.length; i++)
      if (allSame(this.field[i]) || allSame(this.field.map((row) => row[i])))
        return true;

    // Check diagonals
    const mainDiagonal = this.field.map((row, i) => row[i]);
    const antiDiagonal = this.field.map(
      (row, i) => row[this.field.length - 1 - i]
    );

    return allSame(mainDiagonal) || allSame(antiDiagonal);
  }
}
