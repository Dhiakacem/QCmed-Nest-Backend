import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Validate the user's email and password
  async validateUser(mail: string, password: string) {
    const user = await this.usersService.findByEmail(mail);
    if (!user) {
      console.log(`No user found with email: ${mail}`);
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Invalid password for ${mail}`);
      return null;
    }

    return user;
  }

  // Log the user in and return a JWT
  async login(user: any) {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { mail: user.mail, sub: user.id }; // Payload for JWT
    return {
      access_token: this.jwtService.sign(payload), // Sign the JWT token
    };
  }
}
