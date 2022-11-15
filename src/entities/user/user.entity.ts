import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Bet } from '../bet/bet.entity';
import { IUser } from './user.interface';

@Entity()
export class User extends BaseEntity<User> implements IUser {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];
}
