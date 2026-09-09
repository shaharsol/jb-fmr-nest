import { Module } from '@nestjs/common';
import { UserSymbolsService } from './user-symbols.service';
import { UserSymbolsController } from './user-symbols.controller';

@Module({
  controllers: [UserSymbolsController],
  providers: [UserSymbolsService],
})
export class UserSymbolsModule {}
