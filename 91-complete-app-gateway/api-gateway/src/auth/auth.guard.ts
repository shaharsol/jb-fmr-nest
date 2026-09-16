import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AUTH_CLIENT, AUTH_PATTERNS } from '../common/contracts';
import { AuthUser } from './auth-user.type';

export type AuthenticatedRequest = Request & { user: AuthUser };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    const token = authorization.slice('Bearer '.length);
    try {
      request.user = await firstValueFrom(
        this.authClient.send<AuthUser>(AUTH_PATTERNS.VALIDATE, { token }),
      );
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
