import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { User } from './models/user.model';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AppService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  register(registerDto: RegisterDTO): User {
    const userExists = this.users.find(
      (u) => u.username === registerDto.username,
    );

    if (userExists)
      throw new HttpException(
        'Username already in use.',
        HttpStatus.BAD_REQUEST,
      );

    const user = new User();
    user.username = registerDto.username;
    user.password = registerDto.password;

    this.users.push(user);

    return user;
  }

  login(loginDto: LoginDTO): User {
    const user = this.users.find((u) => u.username === loginDto.username);

    if (!user)
      throw new HttpException(
        'Incorrect username or password.',
        HttpStatus.BAD_REQUEST,
      );

    if (user.password !== loginDto.password)
      throw new HttpException(
        'Incorrect username or password.',
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }
}
