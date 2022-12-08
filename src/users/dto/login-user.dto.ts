import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUser } from '../interfaces/User';

export class LoginUserDto implements LoginUser {
  @ApiProperty()
  @IsString()
  @Matches(/^((\+998)[\- ]?)?([\- ]?)?[\d\- ]{7,10}$/)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  password: string;
}
