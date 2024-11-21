import {
  IsOptional,
  IsString,
  IsInt,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly nom?: string;

  @IsOptional()
  @IsString()
  readonly prenom?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsDateString()
  readonly dateNaissance?: string;

  @IsOptional()
  @IsString()
  readonly faculte?: string;

  @IsOptional()
  @IsString()
  readonly statu?: string;

  @IsOptional()
  @IsInt()
  readonly anneeUniversit?: number;
}
