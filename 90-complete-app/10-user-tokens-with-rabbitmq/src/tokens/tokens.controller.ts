import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthUser } from '../auth/auth-user.type';
import { CreateFollowedTokenDto } from './dto/create-followed-token.dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
@UseGuards(AuthGuard)
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  follow(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateFollowedTokenDto,
  ) {
    return this.tokensService.follow(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.tokensService.findAllForUser(user.id);
  }
}
