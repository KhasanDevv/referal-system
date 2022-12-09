import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MarketCreateDto } from './dto/market-create.dto';
import { MarketService } from './market.service';
import { JwtAdminAuthGuard } from '../admin/admin-jwt.guard';

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

  @Get()
  @ApiTags('Market')
  @ApiOkResponse({ description: 'Get Markets' })
  @ApiBearerAuth()
  @UseGuards(JwtAdminAuthGuard)
  async find() {
    const data = this.marketService.find();
    return data;
  }
}
