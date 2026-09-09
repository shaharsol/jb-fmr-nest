import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    signupDto: SignupDto,
  ): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
    const existingUser = await this.usersService.findByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('user with this email already exist');
    }

    const passwordHash = await bcrypt.hash(signupDto.password, 10);
    const user = await this.usersService.create(signupDto.email, passwordHash);
    const accessToken = await this.signJwt(user);
    return {
      accessToken,
      user: this.toSafeUser(user),
    };
  }

  async login(
    user: User,
  ): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
    const accessToken = await this.signJwt(user);
    return {
      accessToken,
      user: this.toSafeUser(user),
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  private signJwt(user: User): Promise<string> {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  private toSafeUser(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
