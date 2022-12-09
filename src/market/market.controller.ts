import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MarketCreateDto } from './dto/market-create.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {}
  @Post()
  @ApiTags('Market')
  @ApiCreatedResponse({ description: 'Api Created responses' })
  @ApiBody({ type: MarketCreateDto })
  async create(@Body(ValidationPipe) credentials: MarketCreateDto) {
    const market = await this.marketService.createMarket(credentials);
    return { market };
  }
}
