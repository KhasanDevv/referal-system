import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { AuthPayload } from '../users/interfaces/User';
import { AdminEntity } from './admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Hello',
    });
  }

  async validate({ type, id }: AuthPayload) {
    if (type !== 'admin') {
      return null;
    }
    const admin = this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      return null;
    }
    return admin;
  }
}
