import { IsNumber } from 'class-validator';

export class MoveDTO implements Readonly<MoveDTO> {
  @IsNumber()
  row: number;

  @IsNumber()
  col: number;
}
