import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'user auth response' })
  @ApiBody({ type: RegisterUserDto })
  async register(@Body(ValidationPipe) credentials: RegisterUserDto) {
    const user = await this.userService.register(credentials);
    const data = { user };
    return data;
  }
}
