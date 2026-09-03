import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create-dto';
import { UpdateDto } from './dto/update-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find(); // select *
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user was not in the db');
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  create(dto: CreateDto): Promise<User> {
    return this.userRepository.save(dto);
  }

  async update(id: string, dto: UpdateDto): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.save({ ...user, ...dto });
  }
}
