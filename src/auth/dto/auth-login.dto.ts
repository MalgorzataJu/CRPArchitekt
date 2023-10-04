import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LogInPair } from '../../types'
export class AuthLoginDto implements LogInPair{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  pwd: string;
}
