import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import configuration from './configuration';
import { JwtConfigService } from './jwt.service';

@Module({
  providers: [JwtConfigService, ConfigService],
  exports: [JwtConfigService, JwtConfigModule],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string(),
        JWT_EXPIRATION: Joi.string(),
        JWT_REFRESH_EXPIRATION: Joi.string(),
      }),
    }),
  ],
})
export class JwtConfigModule {}
