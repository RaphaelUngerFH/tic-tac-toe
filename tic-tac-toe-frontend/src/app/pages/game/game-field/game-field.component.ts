import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timer } from './timer';
import { GameSocketService } from '../../../services/game-socket.service';
import { GameComponent } from '../game.component';

@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css',
})
export class GameFieldComponent implements OnInit {
  @Input() isOpponent = false;
  @Input() reset = new EventEmitter<void>();

  // Triggered after any game field changes and if the game is won with a certain figure
  @Output() change = new EventEmitter<{
    isWin?: boolean;
    isDraw?: boolean;
  }>();

  // Game field
  field: (string | undefined)[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  timer = new Timer();

  constructor(private gameSocketService: GameSocketService) {}

  ngOnInit() {
    this.gameSocketService.listenToGameState().subscribe((res) => {
      if (res.played !== this.gameSocketService.getId()?.toString())
        this.setField(res.board);
    });

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
  set(row: number, col: number) {
    if (!this.isOpponent && !this.field[row][col]) {
      this.field[row][col] = GameComponent.cross;
      this.isOpponent = true;
      this.gameSocketService.emit(row, col);
      this.emitChange();
    }
  }

  // Set the game field based on the board received from the web socket
  private setField(board: [][]) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === this.gameSocketService.getId()?.toString())
          this.field[row][col] = GameComponent.cross;
        else if (board[row][col] !== '')
          this.field[row][col] = GameComponent.circle;
      }
    }

    this.emitChange();
    this.isOpponent = false;
  }

  // Emit if a win, lose or draw is detected
  private emitChange() {
    const isWin = this.isWin();
    const isLose = this.isWin(GameComponent.circle);
    const isDraw =
      !isWin && !isLose && this.field.every((row) => row.every((item) => item));

    this.change.emit({
      isWin: !isWin && !isLose ? undefined : isWin,
      isDraw,
    });
  }

  // Check whether the current figure won the game
  private isWin(figure: string = GameComponent.cross) {
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
