import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.isRefreshToken)
      throw new UnauthorizedException('token passed is a refresh token');

    return {
      userId: payload.sub,
      email: payload.email,
      artistId: payload.artistId,
      roleId: payload.roleId,
      status: payload.status,
    };
  }
}
