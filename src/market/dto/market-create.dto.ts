import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMarket } from '../interfaces/Market';

export class MarketCreateDto implements CreateMarket {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;
}
