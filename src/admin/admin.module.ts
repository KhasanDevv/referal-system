import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { PasswordService } from '../users/services/password.service';
import { AdminController } from './admin.controller';
import { JwtStrategy } from './jwt-admin.strategy';
import { JwtConfig } from '../config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), JwtConfig],
  providers: [AdminService, PasswordService, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
