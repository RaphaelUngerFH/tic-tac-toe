import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { User } from './models/user.model';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AppService {
  private users: User[] = [];
  private readonly HASH_ROUNDS = 10;

  constructor(private jwtService: JwtService) {}

  getUsers(): UserDTO[] {
    return this.users.map((e) => UserDTO.fromEntity(e));
  }

  async register(registerDto: RegisterDTO): Promise<User> {
    const userExists = this.users.find(
      (u) => u.username === registerDto.username,
    );

    if (userExists)
      throw new HttpException(
        'Username already in use.',
        HttpStatus.BAD_REQUEST,
      );

    const file = readFileSync(
      join(process.cwd(), 'src/top-100-password-list.txt'),
    );

    if (file.includes(registerDto.password))
      throw new HttpException(
        'Password matches one of top 100 passwords.',
        HttpStatus.BAD_REQUEST,
      );

    const passwordHash = await bcrypt.hash(
      registerDto.password,
      this.HASH_ROUNDS,
    );

    const user = new User();
    user.username = registerDto.username;
    user.password = passwordHash;

    this.users.push(user);

    return user;
  }

  async login(loginDto: LoginDTO) {
    const user = this.users.find((u) => u.username === loginDto.username);

    if (!user)
      throw new HttpException(
        'Incorrect username or password.',
        HttpStatus.BAD_REQUEST,
      );

    if (!(await bcrypt.compare(loginDto.password, user.password)))
      throw new HttpException(
        'Incorrect username or password.',
        HttpStatus.BAD_REQUEST,
      );

    const payload = { username: user.username };

    return { user: user, accessToken: this.jwtService.sign(payload) };
  }
}
