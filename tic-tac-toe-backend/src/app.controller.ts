import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDTO } from './dto/register.dto';
import { User } from './models/user.model';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDTO): User {
    return this.appService.register(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDTO): User {
    return this.appService.login(loginDto);
  }
}
