import { IsNotEmpty } from 'class-validator';

export class CreateBetDto {
  @IsNotEmpty()
  numbers: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  gameId: string;
}
