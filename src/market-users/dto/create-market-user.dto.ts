import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMarketUserDto {
  @ApiProperty()
  @IsNumber()
  marketId: string;

  @ApiProperty()
  @IsNumber()
  userId: string;
}
