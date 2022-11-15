import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Bet } from '../bet/bet.entity';
import { IGame } from './game.interface';

@Entity()
export class Game extends BaseEntity<Game> implements IGame {
  @Column()
  type: string;

  @Column()
  description: string;

  @Column({ type: 'integer' })
  range: number;

  @Column({ type: 'real' })
  price: number;

  @Column({ type: 'integer' })
  max_number: number;

  @Column()
  color: string;

  @Column({ type: 'real' })
  min_cart_value: number;

  @OneToMany(() => Bet, (bet) => bet.game)
  bets: Bet[];
}
