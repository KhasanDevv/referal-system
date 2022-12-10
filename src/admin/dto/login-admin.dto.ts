import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminResponse, LoginAdmin } from '../interfaces/Admin';

export class LoginAdminDto implements LoginAdmin {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AdminResponseDto implements AdminResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  createdAt: Date;
}
