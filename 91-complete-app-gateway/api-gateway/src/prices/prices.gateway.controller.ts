import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRICES_PATTERNS, TOKEN_VALUES_CLIENT } from '../common/contracts';

@Controller('prices')
export class PricesGatewayController {
  constructor(
    @Inject(TOKEN_VALUES_CLIENT)
    private readonly pricesClient: ClientProxy,
  ) {}

  @Get(':symbol')
  getLatest(@Param('symbol') symbol: string) {
    return firstValueFrom(
      this.pricesClient.send(PRICES_PATTERNS.GET_LATEST, {
        symbol: symbol.trim().toUpperCase(),
      }),
    );
  }
}
