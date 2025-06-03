import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Serve the main portfolio page
  @Get()
  @Render('portfolio')
  getPortfolio() {
    const portfolioData = this.appService.getPortfolioData();
    return { 
      title: 'Portfolio - Backend Developer',
      ...portfolioData 
    };
  }

  // About page
  @Get('about')
  @Render('about')
  getAbout() {
    const portfolioData = this.appService.getPortfolioData();
    return { 
      title: 'About Me - Portfolio',
      ...portfolioData 
    };
  }

  // Projects page
  @Get('projects')
  @Render('projects')
  getProjects() {
    const portfolioData = this.appService.getPortfolioData();
    return { 
      title: 'My Projects - Portfolio',
      // projects: portfolioData.projects,
      // name: portfolioData.name
    };
  }

  // Contact page
  @Get('contact')
  @Render('contact')
  getContact() {
    const portfolioData = this.appService.getPortfolioData();
    return { 
      title: 'Contact Me - Portfolio',
      // contact: portfolioData.contact,
      // name: portfolioData.name
    };
  }

  // API endpoints (keep existing functionality)
  @Get('api/health')
  getHealth(): object {
    return this.appService.getHealth();
  }

  @Get('api/portfolio')
  getPortfolioData(): object {
    return this.appService.getPortfolioData();
  }
}