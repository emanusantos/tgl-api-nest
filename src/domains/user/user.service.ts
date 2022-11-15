import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (await this.findOneByEmail(dto.email))
      throw new BadRequestException(
        'User registered with this email already exists',
      );

    const user = new User(dto);

    return this.userRepository.save(user);
  }

  async find() {
    return this.userRepository.find();
  }

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async delete(id: string) {
    const userToDelete = await this.findById(id);

    if (!userToDelete) throw new NotFoundException('User not found');

    await this.userRepository.remove(userToDelete);
  }
}
