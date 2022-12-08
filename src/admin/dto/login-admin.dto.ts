import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginAdmin } from '../interfaces/Admin';

export class LoginAdminDto implements LoginAdmin {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
