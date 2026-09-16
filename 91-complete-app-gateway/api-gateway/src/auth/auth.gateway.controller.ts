import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_CLIENT, AUTH_PATTERNS } from '../common/contracts';
import { LoginDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthGatewayController {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.SIGNUP, body));
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.LOGIN, body));
  }

  @Get('me')
  async me(@Headers('authorization') authorization?: string) {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token');
    }
    const token = authorization.slice('Bearer '.length);
    return firstValueFrom(
      this.authClient.send(AUTH_PATTERNS.VALIDATE, { token }),
    );
  }
}
