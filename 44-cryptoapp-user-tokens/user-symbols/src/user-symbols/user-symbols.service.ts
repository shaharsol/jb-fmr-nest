import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSymbol } from './user-symbol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowDto } from './dto/follow.dto';

@Injectable()
export class UserSymbolsService {
  constructor(
    @InjectRepository(UserSymbol)
    private readonly userSymbolsRepository: Repository<UserSymbol>,
  ) {}

  async follow(userId: string, dto: FollowDto): Promise<UserSymbol> {
    const existing = await this.userSymbolsRepository.findOne({
      where: { userId, symbol: dto.symbol },
    });

    if (existing) {
      throw new ConflictException(`already following ${dto.symbol}`);
    }

    const userSymbol = this.userSymbolsRepository.create({
      userId,
      symbol: dto.symbol,
    });

    const saved = await this.userSymbolsRepository.save(userSymbol);
    return saved;
  }

  findAllForUser(userId: string): Promise<UserSymbol[]> {
    return this.userSymbolsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
