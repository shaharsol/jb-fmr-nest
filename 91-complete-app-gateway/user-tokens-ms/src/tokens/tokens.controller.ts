import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokensService } from './tokens.service';
import { TOKENS_PATTERNS } from './tokens.patterns';

@Controller()
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @MessagePattern(TOKENS_PATTERNS.FOLLOW)
  follow(
    @Payload() data: { userId: string; symbol: string },
  ) {
    return this.tokensService.follow(data.userId, {
      symbol: data.symbol.trim().toUpperCase(),
    });
  }

  @MessagePattern(TOKENS_PATTERNS.LIST)
  list(@Payload() data: { userId: string }) {
    return this.tokensService.findAllForUser(data.userId);
  }
}
