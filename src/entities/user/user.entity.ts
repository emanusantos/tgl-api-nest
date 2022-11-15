import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Bet } from '../bet/bet.entity';
import { IUser } from './user.interface';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity<User> implements IUser {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bet, (bets) => bets.user)
  bets: Bet[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      return (this.password = bcrypt.hashSync(this.password, 8));
    }
  }

  checkIfPasswordIsValid(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
