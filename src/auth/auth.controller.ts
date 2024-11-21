import { UsersService } from 'src/users/users.service'; // Import UsersService
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
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService // Inject UsersService
  ) {}

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
  async getUserInfo(@Request() req): Promise<UserDto> {
    const userId = req.user.sub; // 'sub' from JWT payload, which is the user ID
    const user = await this.usersService.findById(userId); // Fetch user from DB using usersService

    return user; // The response will be transformed into UserDto automatically
  }
}
