import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFollowedTokenDto } from './dto/create-followed-token.dto';
import { FollowedToken } from './followed-token.entity';
import {
  DISTINCT_TOKEN_EVENT,
  DistinctTokenEvent,
  TOKEN_EVENTS_CLIENT,
} from './token-events';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);

  constructor(
    @InjectRepository(FollowedToken)
    private readonly tokensRepository: Repository<FollowedToken>,
    @Inject(TOKEN_EVENTS_CLIENT)
    private readonly tokenEventsClient: ClientProxy,
  ) {}

  async follow(
    userId: string,
    dto: CreateFollowedTokenDto,
  ): Promise<FollowedToken> {
    const alreadyFollowing = await this.tokensRepository.findOne({
      where: { userId, symbol: dto.symbol },
    });
    if (alreadyFollowing) {
      throw new ConflictException(`Already following ${dto.symbol}`);
    }

    const isNewDistinctSymbol = !(await this.tokensRepository.exist({
      where: { symbol: dto.symbol },
    }));

    const token = this.tokensRepository.create({
      userId,
      symbol: dto.symbol,
    });
    const saved = await this.tokensRepository.save(token);

    if (isNewDistinctSymbol) {
      const payload: DistinctTokenEvent = { symbol: saved.symbol };
      this.tokenEventsClient.emit(DISTINCT_TOKEN_EVENT, payload);
      this.logger.log(
        `Published ${DISTINCT_TOKEN_EVENT} for new symbol ${saved.symbol}`,
      );
    }

    return saved;
  }

  findAllForUser(userId: string): Promise<FollowedToken[]> {
    return this.tokensRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
