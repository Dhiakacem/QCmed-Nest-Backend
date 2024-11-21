import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Ensure JwtStrategy is imported

@Module({
  imports: [
    ConfigModule, // Import ConfigModule
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport for JWT
    forwardRef(() => UsersModule), // If UsersModule is required for user lookup
    JwtModule.registerAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'), // Secret key from .env
        signOptions: { expiresIn: '1h' }, // Token expiration time
      }),
      inject: [ConfigService], // Inject ConfigService to load environment variables
    }),
  ],
  providers: [AuthService, JwtStrategy], // Add JwtStrategy to the providers
  controllers: [AuthController], // Add AuthController
  exports: [JwtModule], // Export JwtModule if needed elsewhere
})
export class AuthModule {}
