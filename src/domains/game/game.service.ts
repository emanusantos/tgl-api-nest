import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  async create(dto: CreateGameDto) {
    const game = new Game(dto);

    return this.gameRepository.save(game);
  }

  async find() {
    return this.gameRepository.find();
  }

  async findById(id: string) {
    return this.gameRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    const gameToDelete = await this.findById(id);

    if (!gameToDelete) throw new NotFoundException('Game not found');

    await this.gameRepository.remove(gameToDelete);
  }
}
