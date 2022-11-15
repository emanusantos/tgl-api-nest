import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from 'src/entities';
import { GameModule } from '../game/game.module';
import { UserModule } from '../user/user.module';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet]), UserModule, GameModule],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule {}
