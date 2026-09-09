import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserSymbolsService } from './user-symbols.service';
import { AuthClientGuard } from 'src/auth-client/guards/auth-client.guard';
import { CurrentUser } from 'src/auth-client/decorators/current-user.decorator';
import { AuthUser } from 'src/auth-client/auth-client.types';

@Controller('user-symbols')
@UseGuards(AuthClientGuard)
export class UserSymbolsController {
  constructor(private readonly userSymbolsService: UserSymbolsService) {}

  follow() {
    // return this.userSymbolsService.follow()
  }

  @Get('')
  findAll(@CurrentUser() user: AuthUser) {
    return this.userSymbolsService.findAllForUser(user.id);
  }
}
