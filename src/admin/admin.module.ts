import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { PasswordService } from '../users/services/password.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.register({
      secret: 'Hello',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AdminService, PasswordService],
  controllers: [AdminController],
})
export class AdminModule {}
