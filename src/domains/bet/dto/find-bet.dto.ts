import { IsOptional } from 'class-validator';

export class FindBetDto {
  @IsOptional()
  userId?: string;

  @IsOptional()
  gameId?: string;
}
