import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], // moduels that i will need to use with DI
  controllers: [AppController],
  providers: [AppService], // internal services to DI to other ingredients of the module
  exports: [], // services that we want to provide to other modules
})
export class AppModule {}
