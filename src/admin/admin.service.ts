import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthResponse } from './interfaces/Admin';
import { PasswordService } from '../users/services/password.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminVeil } from './admin.veil';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async login({
    username,
    password,
  }: LoginAdminDto): Promise<AdminAuthResponse> {
    const admin = await this.adminRepo.findOne({ where: { username } });
    if (!admin) {
      throw new NotFoundException('This username not registered!');
    }
    const isValid = this.passwordService.comparePassword(
      password,
      admin.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: admin.id, type: 'admin' });
    const adminVeil = new AdminVeil(admin);
    return {
      ...adminVeil,
      token,
    };
  }
}
