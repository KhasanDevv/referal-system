import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MarketCreateDto, MarketResponseDto } from './dto/market-create.dto';
import { MarketService } from './market.service';
import { JwtAdminAuthGuard } from '../admin/admin-jwt.guard';
import { ServerErrorResponse } from '../errors/server-error';
import { ValidationErrorResponse } from '../errors/validation-error';
import { UnauthorizedErrorResponse } from '../errors/unauthorized-error';

@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {}

  @Post()
  @ApiTags('Market')
  @ApiBody({ type: MarketCreateDto })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Api Created responses',
    type: MarketResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized response',
    type: UnauthorizedErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  @UseGuards(JwtAdminAuthGuard)
  async create(@Body(ValidationPipe) credentials: MarketCreateDto) {
    const market = await this.marketService.createMarket(credentials);
    return { market };
  }

  @Get()
  @ApiTags('Market')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get Markets',
    type: MarketResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized response',
    type: UnauthorizedErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  @UseGuards(JwtAdminAuthGuard)
  async find() {
    const data = this.marketService.find();
    return data;
  }
}
