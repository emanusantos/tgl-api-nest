import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
