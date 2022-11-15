import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entities';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserWithPassword(user: User, password: string) {
    if (!user.checkIfPasswordIsValid(password)) {
      throw new UnauthorizedException('Email or password is invalid');
    }
    return user;
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password is invalid');
    }
    return this.validateUserWithPassword(user, pass);
  }

  async login(user: User) {
    const { id, email, created_at, name } = user;

    return {
      user: {
        id,
        created_at,
        name,
        email,
      },
      access_token: this.generateAccessToken(user),
    };
  }

  generateAccessToken(user: User) {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
  }

  getUserIdViaAccessToken(token: string) {
    return this.jwtService.verify(token)['sub'];
  }
}
