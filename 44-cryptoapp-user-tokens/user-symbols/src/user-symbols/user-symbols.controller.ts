import { Controller } from '@nestjs/common';
import { UserSymbolsService } from './user-symbols.service';

@Controller('user-symbols')
export class UserSymbolsController {
  constructor(private readonly userSymbolsService: UserSymbolsService) {}
}
