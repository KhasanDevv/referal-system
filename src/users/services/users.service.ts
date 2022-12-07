import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthUserResponse } from '../interfaces/User';
import { JwtService } from '@nestjs/jwt';
import { UserPostgresErrors } from '../user.postgres-errors';
import { PasswordService } from './password.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserVeil } from '../user.veil';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
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
    const userVeil = new UserVeil(user);
    return {
      ...userVeil,
      token,
    };
  }

  async login({
    phoneNumber,
    password,
  }: LoginUserDto): Promise<AuthUserResponse> {
    const user = await this.userRepo.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!user) {
      throw new NotFoundException('Phone number not registered!');
    }
    const isValid = this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: user.id });
    const userVeil = new UserVeil(user);
    return {
      ...userVeil,
      token,
    };
  }
}
