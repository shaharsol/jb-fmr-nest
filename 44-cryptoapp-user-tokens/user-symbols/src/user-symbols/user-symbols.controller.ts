import { Controller, UseGuards } from '@nestjs/common';
import { UserSymbolsService } from './user-symbols.service';
import { AuthClientGuard } from 'src/auth-client/guards/auth-client.guard';

@Controller('user-symbols')
@UseGuards(AuthClientGuard)
export class UserSymbolsController {
  constructor(private readonly userSymbolsService: UserSymbolsService) {}

  follow() {
    // return this.userSymbolsService.follow()
  }

  findAll() {
    // return this.userSymbolsService.findAllForUser()
  }
}
