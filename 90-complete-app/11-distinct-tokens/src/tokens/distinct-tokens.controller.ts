import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DistinctTokensService } from './distinct-tokens.service';
import {
  DISTINCT_TOKEN_EVENT,
  DistinctTokenEvent,
} from './token-events';

@Controller()
export class DistinctTokensController {
  private readonly logger = new Logger(DistinctTokensController.name);

  constructor(private readonly distinctTokensService: DistinctTokensService) {}

  @EventPattern(DISTINCT_TOKEN_EVENT)
  async handleDistinctToken(@Payload() data: DistinctTokenEvent) {
    this.logger.log(`Received ${DISTINCT_TOKEN_EVENT}: ${JSON.stringify(data)}`);
    await this.distinctTokensService.addIfNew(data);
  }
}
