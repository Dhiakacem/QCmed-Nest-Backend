import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY, // JWT secret key from environment variables
    });
  }

  // Fetch user data from the database based on the user ID (sub) from the JWT payload
  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Log the payload (should have the 'sub' field)
    const user = await this.usersService.findById(payload.sub);
    console.log('User from DB:', user); // Log the fetched user object
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
