import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('app-name')
  getAppName(): string {
    return this.configService.get('APP_NAME') || '';
  }

  @Get('app-name-from-service')
  getAppNameFromService(): string {
    return this.appService.getAppName();
  }
}
