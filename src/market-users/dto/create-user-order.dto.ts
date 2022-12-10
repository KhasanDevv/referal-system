import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MarketDto } from './create-market-user.dto';
import { UserResponseDto } from '../../users/dto/register-user.dto';

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

export class UserMarketResponseDto {
  @ApiProperty()
  market: MarketDto;

  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty()
  cashBack: number;
}
