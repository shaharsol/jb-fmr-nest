import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthClientService } from '../auth-client.service';
import { AuthenticatedRequest } from '../auth-client.types';

@Injectable()
export class AuthClientGuard implements CanActivate {
  constructor(private readonly authClientService: AuthClientService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader.startsWith('Bearer ')) return false;

    request.user =
      await this.authClientService.validateBearerToken(authorizationHeader);

    return true;
  }
}
