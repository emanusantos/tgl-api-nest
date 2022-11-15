import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { IUser } from './user.interface';

@Entity()
export class User extends BaseEntity<User> implements IUser {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
