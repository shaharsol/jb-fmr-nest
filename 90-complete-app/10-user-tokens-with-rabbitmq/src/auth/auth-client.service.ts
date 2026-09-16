import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthUser } from './auth-user.type';

@Injectable()
export class AuthClientService {
  private readonly authBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.authBaseUrl = configService.getOrThrow<string>('AUTH_SERVICE_URL');
  }

  async validateBearerToken(authorizationHeader: string): Promise<AuthUser> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<AuthUser>(`${this.authBaseUrl}/auth/me`, {
          headers: { Authorization: authorizationHeader },
        }),
      );
      return data;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
