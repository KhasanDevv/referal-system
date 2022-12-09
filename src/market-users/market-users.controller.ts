import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { MarketUsersService } from './market-users.service';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateMarketUserDto } from './dto/create-market-user.dto';
import { CreateUserWithMarketDto } from './dto/create-user-with-market.dto';

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

  @Post('/users')
  @ApiTags('Market Users')
  @ApiCreatedResponse({ description: 'User add market response' })
  @ApiNotFoundResponse({ description: 'User or market not found response' })
  async createUserWithMarket(
    @Body(ValidationPipe) credentials: CreateUserWithMarketDto,
  ) {
    const data = await this.marketUserService.createUserWithUser(credentials);
    return data;
  }
}
