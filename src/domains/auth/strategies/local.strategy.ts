import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { Strategy } from 'passport-local';

import { User } from 'src/entities';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
    });
  }

  async validate(_: Request, email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
