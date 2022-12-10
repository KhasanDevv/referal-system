import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const JwtConfig = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      privateKey: configService.get('jwt.secret'),
      publicKey: configService.get('jwt.secret'),
      signOptions: {
        expiresIn: parseInt(configService.get('jwt.expiresIn')),
      },
    };
  },
  inject: [ConfigService],
});
