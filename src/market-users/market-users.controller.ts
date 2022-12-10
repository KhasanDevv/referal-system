import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { MarketUsersService } from './market-users.service';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateMarketUserDto } from './dto/create-market-user.dto';
import { CreateUserWithMarketDto } from './dto/create-user-with-market.dto';
import { JwtAdminAuthGuard } from '../admin/admin-jwt.guard';
import { CreateUserOrderDto } from './dto/create-user-order.dto';

@Controller('market-users')
export class MarketUsersController {
  constructor(private marketUserService: MarketUsersService) {}

  @Post()
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User add market response' })
  @ApiNotFoundResponse({ description: 'User or market not found response' })
  @UseGuards(JwtAdminAuthGuard)
  async create(@Body(ValidationPipe) credentials: CreateMarketUserDto) {
    const data = await this.marketUserService.create(credentials);
    return data;
  }

  @Post('/users')
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User add market response' })
  @ApiNotFoundResponse({ description: 'User or market not found response' })
  @UseGuards(JwtAdminAuthGuard)
  async createUserWithMarket(
    @Body(ValidationPipe) credentials: CreateUserWithMarketDto,
  ) {
    const data = await this.marketUserService.createUserWithUser(credentials);
    return data;
  }

  @Get('/users')
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiOkResponse()
  async getMarketUsers() {
    const data = await this.marketUserService.getMarketUsers();
    return data;
  }

  @Post('/orders')
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Added cashback response' })
  @ApiNotFoundResponse({ description: 'User or market not found response' })
  @UseGuards(JwtAdminAuthGuard)
  async createOrder(@Body(ValidationPipe) credentials: CreateUserOrderDto) {
    const data = await this.marketUserService.createOrder(credentials);
    return data;
  }
}
