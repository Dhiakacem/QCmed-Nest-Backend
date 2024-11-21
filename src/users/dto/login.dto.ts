import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  mail: string; // 'mail' field for login

  @IsString()
  password: string;
}
