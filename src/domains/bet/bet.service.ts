import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from 'src/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { FindBetDto } from './dto/find-bet.dto';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet) private readonly betRepository: Repository<Bet>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, dto: CreateBetDto) {
    const user = await this.userService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const bet = new Bet({ ...dto, user });

    await this.betRepository.save(bet);
  }

  async find(dto: FindBetDto, userId: string) {
    let options: FindOptionsWhere<Bet> | FindOptionsWhere<Bet>[] = {};

    if (dto.gameId) options = { game: { id: dto.gameId } };

    if (dto.userId) options = { user: { id: userId } };

    return this.betRepository.find({ where: options });
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
