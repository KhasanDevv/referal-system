import {
  IsArray,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class CreateMarketLevel {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100)
  percentage: number;
}

export class MarketCreateDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ type: [CreateMarketLevel] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMarketLevel)
  levels: CreateMarketLevel[];
}
