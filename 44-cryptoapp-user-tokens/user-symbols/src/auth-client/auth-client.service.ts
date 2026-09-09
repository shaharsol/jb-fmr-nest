import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthUser } from './auth-client.types';

@Injectable()
export class AuthClientService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async validateBearerToken(authorizationHeader: string): Promise<AuthUser> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<AuthUser>(
          `${this.configService.getOrThrow('AUTH_SERVICE_URL')}/auth/me`,
          {
            headers: { Authorization: authorizationHeader },
          },
        ),
      );
      return data;
    } catch {
      throw new UnauthorizedException('could not validate jwt');
    }
  }
}
