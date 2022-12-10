import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UsersService } from './services/users.service';
import { AuthUserResponseDto, RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidationErrorResponse } from '../errors/validation-error';
import { ServerErrorResponse } from '../errors/server-error';
import { BadRequestErrorResponse } from '../errors/bad-request-error';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: 'user auth response',
    type: AuthUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  @ApiBody({ type: RegisterUserDto })
  async register(@Body(ValidationPipe) credentials: RegisterUserDto) {
    const user = await this.userService.register(credentials);
    const data = { user };
    return data;
  }

  @Post('/login')
  @ApiTags('Users')
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ description: 'User Login', type: AuthUserResponseDto })
  @ApiCreatedResponse({
    description: 'user auth response',
    type: AuthUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  async login(@Body(ValidationPipe) credentials: LoginUserDto) {
    const user = await this.userService.login(credentials);
    const data = { user };
    return data;
  }
}
