import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PasswordService } from './services/password.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfig } from '../config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtConfig],
  providers: [UsersService, PasswordService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
