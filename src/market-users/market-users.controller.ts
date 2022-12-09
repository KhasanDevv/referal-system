import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { MarketUsersService } from './market-users.service';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateMarketUserDto } from './dto/create-market-user.dto';

@Controller('market-users')
export class MarketUsersController {
  constructor(private marketUserService: MarketUsersService) {}

  @Post()
  @ApiTags('Market Users')
  @ApiCreatedResponse({ description: 'User add market response' })
  @ApiNotFoundResponse({ description: 'User or market not found response' })
  async create(@Body(ValidationPipe) credentials: CreateMarketUserDto) {
    const data = await this.marketUserService.create(credentials);
    return data;
  }
}
