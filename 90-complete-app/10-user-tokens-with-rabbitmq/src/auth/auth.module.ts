import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthClientService } from './auth-client.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [HttpModule],
  providers: [AuthClientService, AuthGuard],
  exports: [AuthClientService, AuthGuard],
})
export class AuthModule {}
