import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenPrice, TokenPriceDocument } from './token-price.schema';

@Injectable()
export class PricesService {
  constructor(
    @InjectModel(TokenPrice.name)
    private readonly tokenPriceModel: Model<TokenPriceDocument>,
  ) {}

  async findLatestBySymbol(symbol: string): Promise<TokenPrice> {
    const normalized = symbol.trim().toUpperCase();
    const latest = await this.tokenPriceModel
      .findOne({ symbol: normalized })
      .sort({ scrapedAt: -1 })
      .lean()
      .exec();

    if (!latest) {
      throw new RpcException(`No price found for ${normalized}`);
    }

    return latest as TokenPrice;
  }
}
