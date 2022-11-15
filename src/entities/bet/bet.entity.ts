import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Game } from '../game/game.entity';
import { User } from '../user/user.entity';
import { IBet } from './bet.interface';

@Entity()
export class Bet extends BaseEntity<Bet> implements IBet {
  @Column()
  numbers: string;

  @Column()
  price: number;

  @ManyToOne(() => Game, (game) => game.bets)
  game: Game;

  @ManyToOne(() => User, (user) => user.bets)
  user: User;
}
