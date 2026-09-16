import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PricesService } from './prices.service';
import { PRICES_PATTERNS } from './prices.patterns';

@Controller()
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @MessagePattern(PRICES_PATTERNS.GET_LATEST)
  getLatest(@Payload() data: { symbol: string }) {
    return this.pricesService.findLatestBySymbol(data.symbol);
  }
}
