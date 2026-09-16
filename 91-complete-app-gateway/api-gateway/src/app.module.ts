import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './auth/auth.gateway.controller';
import { AuthGuard } from './auth/auth.guard';
import {
  AUTH_CLIENT,
  TOKEN_VALUES_CLIENT,
  USER_TOKENS_CLIENT,
} from './common/contracts';
import { PricesGatewayController } from './prices/prices.gateway.controller';
import { TokensGatewayController } from './tokens/tokens.gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('AUTH_MS_HOST', '127.0.0.1'),
            port: Number(config.get('AUTH_MS_PORT', 4001)),
          },
        }),
      },
      {
        name: USER_TOKENS_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('USER_TOKENS_MS_HOST', '127.0.0.1'),
            port: Number(config.get('USER_TOKENS_MS_PORT', 4002)),
          },
        }),
      },
      {
        name: TOKEN_VALUES_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('TOKEN_VALUES_MS_HOST', '127.0.0.1'),
            port: Number(config.get('TOKEN_VALUES_MS_PORT', 4003)),
          },
        }),
      },
    ]),
  ],
  controllers: [
    AuthGatewayController,
    TokensGatewayController,
    PricesGatewayController,
  ],
  providers: [AuthGuard],
})
export class AppModule {}
