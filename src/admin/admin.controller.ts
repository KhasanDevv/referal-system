import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminResponseDto, LoginAdminDto } from './dto/login-admin.dto';
import { ValidationErrorResponse } from '../errors/validation-error';
import { ServerErrorResponse } from '../errors/server-error';
import { NotFoundErrorResponse } from '../errors/not-found-error';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/login')
  @ApiTags('Admin')
  @ApiOkResponse({
    description: 'Admin login response!',
    type: AdminResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: ValidationErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not found!',
    type: NotFoundErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ServerErrorResponse,
  })
  async login(@Body(ValidationPipe) credentials: LoginAdminDto) {
    const admin = await this.adminService.login(credentials);
    const data = { admin };
    return data;
  }
}
