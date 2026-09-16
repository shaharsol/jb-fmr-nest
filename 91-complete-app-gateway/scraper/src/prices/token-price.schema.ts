import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenPriceDocument = HydratedDocument<TokenPrice>;

@Schema({ collection: 'token_prices', timestamps: false })
export class TokenPrice {
  @Prop({ required: true, index: true })
  symbol: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ required: true })
  change: number;

  @Prop({ required: true })
  changePercent: number;

  @Prop({ required: true })
  sourceUrl: string;

  @Prop({ required: true, default: () => new Date(), index: true })
  scrapedAt: Date;
}

export const TokenPriceSchema = SchemaFactory.createForClass(TokenPrice);
