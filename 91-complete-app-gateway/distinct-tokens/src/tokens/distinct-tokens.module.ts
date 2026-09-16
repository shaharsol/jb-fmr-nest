import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistinctToken } from './distinct-token.entity';
import { DistinctTokensController } from './distinct-tokens.controller';
import { DistinctTokensService } from './distinct-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([DistinctToken])],
  controllers: [DistinctTokensController],
  providers: [DistinctTokensService],
})
export class DistinctTokensModule {}
