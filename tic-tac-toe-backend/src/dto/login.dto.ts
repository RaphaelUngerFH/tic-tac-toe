import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO implements Readonly<LoginDTO> {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
