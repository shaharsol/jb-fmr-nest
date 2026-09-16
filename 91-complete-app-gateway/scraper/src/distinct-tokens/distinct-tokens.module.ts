import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistinctToken } from './distinct-token.entity';
import { DistinctTokensService } from './distinct-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([DistinctToken])],
  providers: [DistinctTokensService],
  exports: [DistinctTokensService],
})
export class DistinctTokensModule {}
