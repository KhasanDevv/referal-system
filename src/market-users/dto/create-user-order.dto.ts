import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserOrderDto {
  @ApiProperty()
  @IsNumber()
  marketId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  orderPrice: number;
}
