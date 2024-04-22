import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDTO } from './dto/register.dto';
import { User } from './models/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDTO) {
    return this.appService.register(registerDto);
  }
}
