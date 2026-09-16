import { Module } from '@nestjs/common';
import { DistinctTokensModule } from '../distinct-tokens/distinct-tokens.module';
import { PricesModule } from '../prices/prices.module';
import { GoogleFinanceScraper } from './google-finance.scraper';
import { ScraperService } from './scraper.service';

@Module({
  imports: [DistinctTokensModule, PricesModule],
  providers: [GoogleFinanceScraper, ScraperService],
})
export class ScraperModule {}
