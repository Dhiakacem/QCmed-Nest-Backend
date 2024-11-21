import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { JwtAuthGuard } from './JwtAuthGuard';
import { UserDto } from 'src/users/dto/user.dto';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.mail,
      loginDto.password
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user); // Returns JWT token
  }

  @Get('info')
  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  getUserInfo(@Request() req): UserDto {
    const user = req.user; // This is the user object, populated by the JWT strategy
    // Convert the user object into the UserDto class, excluding the password
    return plainToClass(UserDto, user);
  }
}
