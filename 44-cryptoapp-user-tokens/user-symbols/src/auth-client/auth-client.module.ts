import { Module } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { HttpModule } from '@nestjs/axios';
import { AuthClientGuard } from './guards/auth-client.guard';

@Module({
  imports: [HttpModule],
  providers: [AuthClientService],
  exports: [AuthClientService, AuthClientGuard],
})
export class AuthClientModule {}
