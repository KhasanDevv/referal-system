import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './services/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  @ApiTags('Users')
  @ApiCreatedResponse({ description: 'user auth response' })
  @ApiBody({ type: RegisterUserDto })
  async register(@Body(ValidationPipe) credentials: RegisterUserDto) {
    const user = await this.userService.register(credentials);
    const data = { user };
    return data;
  }

  @Post('/login')
  @ApiTags('Users')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginUserDto })
  async login(@Body(ValidationPipe) credentials: LoginUserDto) {
    const user = await this.userService.login(credentials);
    const data = { user };
    return data;
  }
}
