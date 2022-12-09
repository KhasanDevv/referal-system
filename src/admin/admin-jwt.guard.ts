import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard(['jwt-admin']) {
  handleRequest(err, user, info, context) {
    console.log(err, user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
