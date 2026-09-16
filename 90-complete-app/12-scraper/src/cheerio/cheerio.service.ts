import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

export type { CheerioAPI };

@Injectable()
export class CheerioService {
  load(html: string): CheerioAPI {
    return cheerio.load(html);
  }

  /** First matching element's trimmed text, or null if missing/empty. */
  text($: CheerioAPI, selector: string): string | null {
    const value = $(selector).first().text().trim();
    return value.length > 0 ? value : null;
  }

  /** Inner HTML of every `<script>` tag (in document order). */
  scriptContents($: CheerioAPI): string[] {
    const scripts: string[] = [];
    $('script').each((_, el) => {
      const content = $(el).html();
      if (content) {
        scripts.push(content);
      }
    });
    return scripts;
  }
}
