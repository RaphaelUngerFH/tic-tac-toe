import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { User } from './models/user.model';

@Injectable()
export class AppService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  register(registerDto: RegisterDTO) {
    const user = new User();
    user.username = registerDto.username;
    user.password = registerDto.password;

    this.users.push(user);

    return user;
  }
}
