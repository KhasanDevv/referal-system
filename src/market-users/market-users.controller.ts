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
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateMarketUserDto,
  MarketUserResponseDto,
} from './dto/create-market-user.dto';
import { CreateUserWithMarketDto } from './dto/create-user-with-market.dto';
import { JwtAdminAuthGuard } from '../admin/admin-jwt.guard';
import {
  CreateUserOrderDto,
  UserMarketResponseDto,
} from './dto/create-user-order.dto';
import { ValidationErrorResponse } from '../errors/validation-error';
import { NotFoundErrorResponse } from '../errors/not-found-error';
import { ServerErrorResponse } from '../errors/server-error';
import { UnauthorizedErrorResponse } from '../errors/unauthorized-error';

@Controller('market-users')
export class MarketUsersController {
  constructor(private marketUserService: MarketUsersService) {}

  @Post()
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'User add market response',
    type: MarketUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized response',
    type: UnauthorizedErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not found!',
    type: NotFoundErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  @UseGuards(JwtAdminAuthGuard)
  async create(@Body(ValidationPipe) credentials: CreateMarketUserDto) {
    const data = await this.marketUserService.create(credentials);
    return data;
  }

  @Post('/users')
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'User add market response',
    type: MarketUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized response',
    type: UnauthorizedErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not found!',
    type: NotFoundErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
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
  @ApiOkResponse({
    description: 'Market list with users cashBack',
    type: UserMarketResponseDto,
    isArray: true,
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
  async getMarketUsers() {
    const data = await this.marketUserService.getMarketUsers();
    return data;
  }

  @Post('/orders')
  @ApiTags('Market Users')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Added cashback response',
    type: UserMarketResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized response',
    type: UnauthorizedErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not found!',
    type: NotFoundErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  @UseGuards(JwtAdminAuthGuard)
  async createOrder(@Body(ValidationPipe) credentials: CreateUserOrderDto) {
    const data = await this.marketUserService.createOrder(credentials);
    return data;
  }
}
