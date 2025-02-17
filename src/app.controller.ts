import { Controller, Get } from '@nestjs/common';
import { formatResponse } from './common/helpers/response.helper';

@Controller()
export class AppController {
  @Get()
  getRoot(): { success: boolean; message: string; data: { docs: string; health: string; }; timestamp: string; } {
    return formatResponse('Anicrush Scraper API', {
      docs: '/api/v1/docs',
      health: '/api/v1/health',
    });
  }
} 