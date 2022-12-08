import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/login')
  @ApiTags('Admin')
  @ApiOkResponse({ description: 'Admin login response!' })
  @ApiBody({ type: LoginAdminDto })
  async login(@Body(ValidationPipe) credentials: LoginAdminDto) {
    const admin = await this.adminService.login(credentials);
    const data = { admin };
    return data;
  }
}
