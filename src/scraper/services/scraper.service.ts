import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {
  // TODO: Implement scraping logic
  async scrapeWebsite(url: string): Promise<any> {
    return { status: 'TODO', url, data: null };
  }
} 