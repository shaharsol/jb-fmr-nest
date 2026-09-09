import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'; // uses the 'local' literal as it's identifier for passport
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }
    return user;
  }
}
