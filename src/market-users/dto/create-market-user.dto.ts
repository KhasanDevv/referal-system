import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMarketUserDto {
  @ApiProperty()
  @IsNumber()
  marketId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  referralId: number;
}
