import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('app-name/:id')
  getAppName(@Param('id') id: string, @Query() queryParams: any): string {
    console.log(id);
    console.log(queryParams.name);
    return this.configService.get('APP_NAME') || '';
  }

  @Get('app-name-from-service')
  getAppNameFromService(@Query('name') name: string): string {
    console.log(name);
    return this.appService.getAppName();
  }

  @Post('new-user')
  @HttpCode(200)
  addUser(@Body('id') id: string): string {
    console.log(id);
    return 'user created...';
  }
}
