import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });
  
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAppName(): string {
    this.logger.log('get app name was called....');
    return this.configService.get('APP_NAME') || '';
  }
}
