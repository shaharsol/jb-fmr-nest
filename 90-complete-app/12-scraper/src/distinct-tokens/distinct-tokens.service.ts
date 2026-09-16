import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistinctToken } from './distinct-token.entity';

@Injectable()
export class DistinctTokensService {
  constructor(
    @InjectRepository(DistinctToken)
    private readonly tokensRepository: Repository<DistinctToken>,
  ) {}

  findAll(): Promise<DistinctToken[]> {
    return this.tokensRepository.find({ order: { symbol: 'ASC' } });
  }
}
