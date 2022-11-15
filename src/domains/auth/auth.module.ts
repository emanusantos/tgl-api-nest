import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { AuthController } from './auth.controller';
import { JwtConfigModule } from 'src/config/jwt/jwt.module';
import { JwtConfigService } from 'src/config/jwt/jwt.service';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtConfigModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: async (jwtConfig: JwtConfigService) => ({
        secret: jwtConfig.secret,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
