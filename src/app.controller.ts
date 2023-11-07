import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth-guard/auth-guard.service';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return process.env.DATABASE_HOST
  }
}
