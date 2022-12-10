import { RegisterUserDto } from '../../users/dto/register-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserWithMarketDto extends RegisterUserDto {
  @ApiProperty()
  @IsNumber()
  marketId: number;
}
