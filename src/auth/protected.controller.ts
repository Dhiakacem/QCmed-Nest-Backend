import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard) // Protect this route with JWT guard
  getProtectedData() {
    return { message: 'This is a protected route' };
  }
}
