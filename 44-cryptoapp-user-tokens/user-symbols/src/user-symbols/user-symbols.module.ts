import { Module } from '@nestjs/common';
import { UserSymbolsService } from './user-symbols.service';
import { UserSymbolsController } from './user-symbols.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSymbol } from './user-symbol.entity';
import { AuthClientModule } from 'src/auth-client/auth-client.module';

@Module({
  imports: [AuthClientModule, TypeOrmModule.forFeature([UserSymbol])],
  controllers: [UserSymbolsController],
  providers: [UserSymbolsService],
})
export class UserSymbolsModule {}
