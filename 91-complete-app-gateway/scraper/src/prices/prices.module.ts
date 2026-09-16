import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PricesService } from './prices.service';
import { TokenPrice, TokenPriceSchema } from './token-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenPrice.name, schema: TokenPriceSchema },
    ]),
  ],
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
