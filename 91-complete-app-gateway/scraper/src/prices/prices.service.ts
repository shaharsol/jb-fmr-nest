import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenPrice, TokenPriceDocument } from './token-price.schema';

export type SaveTokenPriceInput = {
  symbol: string;
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  sourceUrl: string;
};

@Injectable()
export class PricesService {
  constructor(
    @InjectModel(TokenPrice.name)
    private readonly tokenPriceModel: Model<TokenPriceDocument>,
  ) {}

  save(input: SaveTokenPriceInput): Promise<TokenPriceDocument> {
    return this.tokenPriceModel.create({
      ...input,
      scrapedAt: new Date(),
    });
  }
}
