import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DistinctTokensService } from '../distinct-tokens/distinct-tokens.service';
import { PricesService } from '../prices/prices.service';
import { GoogleFinanceScraper } from './google-finance.scraper';

@Injectable()
export class ScraperService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ScraperService.name);
  private timer?: NodeJS.Timeout;
  private running = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly distinctTokensService: DistinctTokensService,
    private readonly googleFinanceScraper: GoogleFinanceScraper,
    private readonly pricesService: PricesService,
  ) {}

  onModuleInit() {
    const intervalMs = Number(
      this.configService.get('SCRAPE_INTERVAL_MS', 60_000),
    );
    this.logger.log(`Starting scraper every ${intervalMs}ms`);
    void this.scrapeAll();
    this.timer = setInterval(() => void this.scrapeAll(), intervalMs);
  }

  onModuleDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  async scrapeAll(): Promise<void> {
    if (this.running) {
      this.logger.warn('Previous scrape still running — skipping tick');
      return;
    }

    this.running = true;
    try {
      const tokens = await this.distinctTokensService.findAll();
      this.logger.log(`Scraping ${tokens.length} distinct token(s)`);

      for (const token of tokens) {
        try {
          const quote = await this.googleFinanceScraper.scrape(token.symbol);
          await this.pricesService.save(quote);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          this.logger.error(`Failed to scrape ${token.symbol}: ${message}`);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Scrape cycle failed: ${message}`);
    } finally {
      this.running = false;
    }
  }
}
