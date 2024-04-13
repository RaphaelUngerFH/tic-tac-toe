import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css',
})
export class GameFieldComponent implements OnInit {
  @Input() figure?: string;

  // Triggered after any game field changes and if the game is won with a certain figure
  @Output() change = new EventEmitter<{ figure: string; isWin: boolean }>();

  // Game field
  field: (string | undefined)[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  // True, if it's the oppenent's turn
  isOpponent = false;

  ngOnInit() {
    // TODO listen on changes from the opponent and update the field
  }

  // Set the game figure on a specific field
  set(row: number, col: number, figure?: string) {
    if (!this.field[row][col] && figure) {
      this.field[row][col] = figure;
      this.change.emit({ figure, isWin: this.isWin(figure) });
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
