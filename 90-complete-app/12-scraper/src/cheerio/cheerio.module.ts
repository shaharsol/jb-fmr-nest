import { Global, Module } from '@nestjs/common';
import { CheerioService } from './cheerio.service';

@Global()
@Module({
  providers: [CheerioService],
  exports: [CheerioService],
})
export class CheerioModule {}
