import { Exclude, Expose } from 'class-transformer';
import { IsString, IsDateString } from 'class-validator';

export class UserDto {
  @Expose()
  @IsString()
  nom: string;

  @Expose()
  @IsString()
  prenom: string;

  @Expose()
  @IsString()
  mail: string;

  @Expose()
  @IsDateString()
  dateNaissance: Date;

  @Expose()
  @IsString()
  faculté: string;

  @Expose()
  @IsString()
  statu: string;

  @Expose()
  @IsString()
  anneeUniversitaire: string;

  @Exclude() // Exclude password from being returned
  password: string;
}
