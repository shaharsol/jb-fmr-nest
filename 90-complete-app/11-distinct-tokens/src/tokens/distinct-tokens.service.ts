import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistinctToken } from './distinct-token.entity';
import { DistinctTokenEvent } from './token-events';

@Injectable()
export class DistinctTokensService {
  private readonly logger = new Logger(DistinctTokensService.name);

  constructor(
    @InjectRepository(DistinctToken)
    private readonly tokensRepository: Repository<DistinctToken>,
  ) {}

  async addIfNew(event: DistinctTokenEvent): Promise<DistinctToken | null> {
    const symbol = event.symbol?.trim().toUpperCase();
    if (!symbol) {
      this.logger.warn('Ignoring event with empty symbol');
      return null;
    }

    const existing = await this.tokensRepository.findOne({ where: { symbol } });
    if (existing) {
      this.logger.log(`Symbol ${symbol} already tracked — skipping`);
      return existing;
    }

    const saved = await this.tokensRepository.save(
      this.tokensRepository.create({ symbol }),
    );
    this.logger.log(`Added distinct token ${symbol}`);
    return saved;
  }
}
