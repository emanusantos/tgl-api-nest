import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  range: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsInt()
  max_number: number;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  min_cart_value: number;
}
