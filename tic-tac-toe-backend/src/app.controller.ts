import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDTO } from './dto/register.dto';
import { User } from './models/user.model';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDTO } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  getUsers(): UserDTO[] {
    return this.appService.getUsers();
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDTO): Promise<User> {
    return await this.appService.register(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDTO) {
    return await this.appService.login(loginDto);
  }
}
