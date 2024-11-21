import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('No token provided'); // More specific error message
    }

    try {
      const decoded = this.jwtService.verify(token.split(' ')[1]); // Extract token from 'Bearer <token>'
      request.user = decoded; // Attach decoded user info to request object
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token'); // More specific error message
    }
  }
}
