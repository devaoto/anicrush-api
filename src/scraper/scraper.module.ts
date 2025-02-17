import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './services/scraper.service';
// TODO: Add services and controllers for scraping functionality

@Module({
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {} 