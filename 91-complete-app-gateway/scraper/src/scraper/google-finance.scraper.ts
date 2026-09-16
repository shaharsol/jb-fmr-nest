import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CheerioAPI, CheerioService } from '../cheerio/cheerio.service';

export type GoogleFinanceQuote = {
  symbol: string;
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  sourceUrl: string;
};

@Injectable()
export class GoogleFinanceScraper {
  private readonly logger = new Logger(GoogleFinanceScraper.name);
  private readonly quoteUrlTemplate: string;

  constructor(
    configService: ConfigService,
    private readonly cheerioService: CheerioService,
  ) {
    this.quoteUrlTemplate = configService.get<string>(
      'GOOGLE_FINANCE_QUOTE_URL',
      'https://www.google.com/finance/beta/quote/{symbol}-USD',
    );
  }

  buildUrl(symbol: string): string {
    return this.quoteUrlTemplate.replace('{symbol}', symbol.toUpperCase());
  }

  async scrape(symbol: string): Promise<GoogleFinanceQuote> {
    const sourceUrl = this.buildUrl(symbol);
    const { data: html } = await axios.get<string>(sourceUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 20_000,
      responseType: 'text',
    });

    const upper = symbol.toUpperCase();
    const $ = this.cheerioService.load(html);
    const quote =
      this.parseFromDom($) ?? this.parseFromEmbeddedScripts($, upper);

    if (!quote) {
      throw new Error(`Could not parse Google Finance price for ${upper}`);
    }

    this.logger.log(`${upper} = ${quote.price} USD (${quote.changePercent}%)`);
    return {
      symbol: upper,
      currency: 'USD',
      sourceUrl,
      ...quote,
    };
  }

  /**
   * Prefer live DOM nodes when Google SSR-includes them
   * (often empty on plain HTTP fetches).
   */
  private parseFromDom(
    $: CheerioAPI,
  ): Pick<GoogleFinanceQuote, 'price' | 'change' | 'changePercent'> | null {
    const priceText = this.cheerioService.text($, 'div.YMlKec.fxKbKc');
    if (!priceText) {
      return null;
    }

    const price = this.parseNumber(priceText);
    if (price === null) {
      return null;
    }

    const changeText = this.cheerioService.text($, 'span.P2Luy.ZYVHBb');
    const changePercentText = this.cheerioService.text($, 'div.JwB6zf');

    return {
      price,
      change: this.parseNumber(changeText ?? '') ?? 0,
      changePercent: this.parseNumber(changePercentText ?? '') ?? 0,
    };
  }

  /**
   * Google embeds quote snapshots in AF_initDataCallback `<script>` tags.
   * Cheerio collects those scripts; we then read the [price, change, pct] tuple
   * next to "{SYMBOL}-USD".
   */
  private parseFromEmbeddedScripts(
    $: CheerioAPI,
    symbol: string,
  ): Pick<GoogleFinanceQuote, 'price' | 'change' | 'changePercent'> | null {
    const quoteId = `${symbol}-USD`;
    const tuplePattern = new RegExp(
      String.raw`\[([0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?),(-?[0-9]+(?:\.[0-9]+)?)(?:,\d+){3}\][\s\S]{0,200}?"${quoteId}"`,
    );

    for (const script of this.cheerioService.scriptContents($)) {
      if (!script.includes('AF_initDataCallback') || !script.includes(quoteId)) {
        continue;
      }
      const match = script.match(tuplePattern);
      if (!match) {
        continue;
      }
      const price = Number(match[1]);
      const change = Number(match[2]);
      const changePercent = Number(match[3]);
      if (![price, change, changePercent].every((n) => Number.isFinite(n))) {
        continue;
      }
      return { price, change, changePercent };
    }

    return null;
  }

  private parseNumber(raw: string): number | null {
    const normalized = raw.replace(/[^0-9.+-]/g, '');
    if (!normalized) {
      return null;
    }
    const value = Number(normalized);
    return Number.isFinite(value) ? value : null;
  }
}
