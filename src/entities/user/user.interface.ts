import { IBet } from '../bet/bet.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  bets: IBet[];
}
