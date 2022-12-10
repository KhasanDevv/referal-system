import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthUserResponse, RegisterUser } from '../interfaces/User';

export class RegisterUserDto implements RegisterUser {
  @ApiProperty()
  @IsString()
  @MaxLength(16)
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(/^((\+998)[\- ]?)?([\- ]?)?[\d\- ]{7,10}$/)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  createdAt: Date;
}

export class AuthUserResponseDto extends UserResponseDto {
  @ApiProperty()
  token: string;
}
