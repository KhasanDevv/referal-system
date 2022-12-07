import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthUserResponse } from './interfaces/User';
import { JwtService } from '@nestjs/jwt';
import { UserPostgresErrors } from './user.postgres-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterUserDto): Promise<AuthUserResponse> {
    const userEntity = this.userRepo.create({
      ...credentials,
      phoneNumber: credentials.phoneNumber.replace('+', ''),
    });
    const user = (await this.userRepo
      .save(userEntity)
      .catch(UserPostgresErrors.phoneNumberAlreadyExist)) as UserEntity;
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    const data: AuthUserResponse = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      token,
    };
    return data;
  }
}
