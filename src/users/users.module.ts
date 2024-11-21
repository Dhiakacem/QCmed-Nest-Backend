import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule using forwardRef
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule), // Use forwardRef() to resolve potential circular dependency
  ],
  providers: [UsersService, JwtAuthGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
