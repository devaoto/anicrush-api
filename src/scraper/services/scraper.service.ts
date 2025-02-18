import { Injectable } from '@nestjs/common';
import { 
  getTrending,
  getTopAiring,
  getInfo,
  getCharacters,
  getEpisodes,
  search 
} from '../../anicrush';
import { getSources } from '../../anicrush/sources/sources';
import type { SourceServer } from '../../anicrush/sources/types';

@Injectable()
export class ScraperService {
  async scrapeWebsite(url: string): Promise<any> {
    return { status: 'TODO', url, data: null };
  }

  async getTrending(page: number, limit: number) {
    return getTrending(limit);
  }

  async getTopAiring(page: number, limit: number) {
    return getTopAiring(limit);
  }

  async getAnimeInfo(id: string) {
    return getInfo(id);
  }

  async getCharacters(id: string, page: number, limit: number) {
    return getCharacters(id, limit, page);
  }

  async getEpisodes(id: string) {
    return getEpisodes(id);
  }

  async searchAnime(query: string, page: number, limit: number) {
    return search(query, page, limit);
  }

  async getSources(id: string, episode: number, audioType: "sub" | "dub" = "sub", serverName: SourceServer) {
    return getSources(id, episode, audioType, serverName);
  }
} 