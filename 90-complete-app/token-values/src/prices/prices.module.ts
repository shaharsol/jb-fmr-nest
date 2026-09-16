import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { TokenPrice, TokenPriceSchema } from './token-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenPrice.name, schema: TokenPriceSchema },
    ]),
  ],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
