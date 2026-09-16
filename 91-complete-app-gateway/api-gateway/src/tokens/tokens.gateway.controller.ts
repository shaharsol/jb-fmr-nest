import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthUser } from '../auth/auth-user.type';
import { TOKENS_PATTERNS, USER_TOKENS_CLIENT } from '../common/contracts';
import { FollowTokenDto } from './follow-token.dto';

@Controller('tokens')
@UseGuards(AuthGuard)
export class TokensGatewayController {
  constructor(
    @Inject(USER_TOKENS_CLIENT)
    private readonly tokensClient: ClientProxy,
  ) {}

  @Post()
  follow(@CurrentUser() user: AuthUser, @Body() body: FollowTokenDto) {
    return firstValueFrom(
      this.tokensClient.send(TOKENS_PATTERNS.FOLLOW, {
        userId: user.id,
        symbol: body.symbol,
      }),
    );
  }

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return firstValueFrom(
      this.tokensClient.send(TOKENS_PATTERNS.LIST, { userId: user.id }),
    );
  }
}
