import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = new User(dto);

    await this.userRepository.save(user);
  }

  async find() {
    return this.userRepository.find();
  }

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    const userToDelete = await this.findById(id);

    if (!userToDelete) throw new NotFoundException('User not found');

    await this.userRepository.remove(userToDelete);
  }
}
