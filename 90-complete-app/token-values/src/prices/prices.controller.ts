import { Controller, Get, Param } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller()
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get(':symbol')
  getLatest(@Param('symbol') symbol: string) {
    return this.pricesService.findLatestBySymbol(symbol);
  }
}
