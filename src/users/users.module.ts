import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'Hello',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [UsersService, PasswordService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
