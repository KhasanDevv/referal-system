import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/register-user.dto';

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

export class MarketDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class MarketUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  market: MarketDto;

  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty()
  referral: UserResponseDto;

  @ApiProperty()
  cashBack: number;
}
