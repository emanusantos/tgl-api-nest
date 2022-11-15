import { IGame } from '../game/game.interface';
import { IUser } from '../user/user.interface';

export interface IBet {
  numbers: string;
  price: number;
  user: Partial<IUser>;
  game: Partial<IGame>;
}
