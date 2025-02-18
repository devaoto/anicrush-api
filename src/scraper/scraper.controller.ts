import { Controller, Get, Query, Param } from '@nestjs/common';
import { formatResponse } from '../common/helpers/response.helper';
import { ScraperService } from './services/scraper.service';
import type { SourceServer } from '../anicrush/sources/types';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('trending')
  async getTrending(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const data = await this.scraperService.getTrending(page, limit);
    return formatResponse('Trending anime retrieved successfully', data);
  }

  @Get('top-airing')
  async getTopAiring(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const data = await this.scraperService.getTopAiring(page, limit);
    return formatResponse('Top airing anime retrieved successfully', data);
  }

  @Get('info/:id')
  async getAnimeInfo(@Param('id') id: string) {
    const data = await this.scraperService.getAnimeInfo(id);
    return formatResponse('Anime info retrieved successfully', data);
  }

  @Get('characters/:id')
  async getCharacters(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const data = await this.scraperService.getCharacters(id, page, limit);
    return formatResponse('Characters retrieved successfully', data);
  }

  @Get('episodes/:id')
  async getEpisodes(@Param('id') id: string) {
    const data = await this.scraperService.getEpisodes(id);
    return formatResponse('Episodes retrieved successfully', data);
  }

  @Get('search/:query')
  async searchAnime(
    @Param('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    const data = await this.scraperService.searchAnime(query, page, limit);
    return formatResponse('Search results retrieved successfully', data);
  }

  @Get("sources/:id")
  async getSources(@Param("id") id: string, @Query("episode") episode: number, @Query("audioType") audioType: "sub" | "dub" = "sub", @Query("serverName") serverName: SourceServer) {
    const data = await this.scraperService.getSources(id, episode, audioType, serverName);
    return formatResponse("Sources retrieved successfully", data);
  }
} 