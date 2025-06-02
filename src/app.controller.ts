import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api/health')
  getHealth(): object {
    return this.appService.getHealth();
  }

  @Get('api/portfolio')
  getPortfolioData(): object {
    return this.appService.getPortfolioData();
  }
}