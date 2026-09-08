import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST', 'localhost'),
        port: configService.getOrThrow<number>('DB_PORT', 3306),
        username: configService.getOrThrow('DB_USER', 'root'),
        password: '',
        database: configService.getOrThrow('DB_NAME', 'crypto_auth'),
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
