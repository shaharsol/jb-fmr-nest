import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSymbolsModule } from './user-symbols/user-symbols.module';
import { UserSymbol } from './user-symbols/user-symbol.entity';
import { AuthClientModule } from './auth-client/auth-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST', 'localhost'),
        port: configService.getOrThrow<number>('DB_PORT', 3307),
        username: configService.getOrThrow('DB_USER', 'root'),
        password: '',
        database: configService.getOrThrow('DB_NAME', 'crypto_user_symbols'),
        entities: [UserSymbol],
        synchronize: true,
      }),
    }),
    UserSymbolsModule,
    AuthClientModule,
  ],
})
export class AppModule {}
