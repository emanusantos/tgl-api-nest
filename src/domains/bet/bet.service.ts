import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from 'src/entities';
import { Repository } from 'typeorm';
import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { FindBetDto } from './dto/find-bet.dto';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet) private readonly betRepository: Repository<Bet>,
    private readonly userService: UserService,
    private readonly gameService: GameService,
  ) {}

  async create(userId: string, dto: CreateBetDto) {
    const user = await this.userService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const game = await this.gameService.findById(dto.gameId);

    if (!game) throw new NotFoundException('Game not found');

    const bet = new Bet({ ...dto, game, user });

    return this.betRepository.save(bet);
  }

  async find(dto: FindBetDto) {
    let snapshot = this.betRepository
      .createQueryBuilder('bet')
      .leftJoinAndSelect('bet.game', 'game')
      .leftJoin('bet.user', 'user')
      .addSelect('user.id');

    if (dto.gameId)
      snapshot = snapshot.where(`game.id = :gameId`, { gameId: dto.gameId });

    if (dto.userId)
      snapshot = snapshot.andWhere(`user.id = :userId`, { userId: dto.userId });

    return snapshot.getMany();
  }

  async findById(id: string) {
    return this.betRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    const betToDelete = await this.findById(id);

    if (!betToDelete) throw new NotFoundException('Bet not found');

    await this.betRepository.remove(betToDelete);
  }
}
