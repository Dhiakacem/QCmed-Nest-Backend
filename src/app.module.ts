import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load .env file globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure MongoDB connection using environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Read MONGO_URI from .env
        dbName: configService.get<string>('DB_NAME'), // Read DB_NAME from .env
      }),
    }),

    // Add your feature modules here
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
