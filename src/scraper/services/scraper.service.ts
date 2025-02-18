import { Injectable } from '@nestjs/common';
import { 
  getTrending,
  getTopAiring,
  getInfo,
  getCharacters,
  getEpisodes,
  search,
  getSources,
  type FormattedSeasonalResponse,
  type SearchResponse,
  type ExtractedSrc
} from '../../anicrush';
import type { SourceServer } from '../../anicrush/sources/types';
import { Cache } from '../../cache';

@Injectable()
export class ScraperService {
  async scrapeWebsite(url: string): Promise<any> {
    return { status: 'TODO', url, data: null };
  }

  // Trending with 3h cache
  async getTrending(page: number, limit: number): Promise<FormattedSeasonalResponse> {
    const cacheKey = `trending:${page}:${limit}`;
    const cached = await Cache.get<FormattedSeasonalResponse>(cacheKey);
    if (cached) return cached;
    
    const data = await getTrending(limit);
    await Cache.set(cacheKey, data, 10800); // 3 hours
    return data;
  }

  // Top Airing with 3h cache
  async getTopAiring(page: number, limit: number): Promise<FormattedSeasonalResponse> {
    const cacheKey = `top-airing:${page}:${limit}`;
    const cached = await Cache.get<FormattedSeasonalResponse>(cacheKey);
    if (cached) return cached;

    const data = await getTopAiring(limit);
    await Cache.set(cacheKey, data, 10800);
    return data;
  }

  // Anime Info with 12h cache
  async getAnimeInfo(id: string): Promise<any> {
    const cacheKey = `info:${id}`;
    const cached = await Cache.get<any>(cacheKey);
    if (cached) return cached;

    const data = await getInfo(id);
    await Cache.set(cacheKey, data, 43200); // 12 hours
    return data;
  }

  // Characters with 3h cache
  async getCharacters(id: string, page: number, limit: number): Promise<any> {
    const cacheKey = `characters:${id}:${page}:${limit}`;
    const cached = await Cache.get<any>(cacheKey);
    if (cached) return cached;

    const data = await getCharacters(id, limit, page);
    await Cache.set(cacheKey, data, 10800);
    return data;
  }

  // Episodes with 1h cache
  async getEpisodes(id: string): Promise<any> {
    const cacheKey = `episodes:${id}`;
    const cached = await Cache.get<any>(cacheKey);
    if (cached) return cached;

    const data = await getEpisodes(id);
    await Cache.set(cacheKey, data, 3600);
    return data;
  }

  // Search with 3h cache
  async searchAnime(query: string, page: number, limit: number): Promise<SearchResponse> {
    const cacheKey = `search:${query}:${page}:${limit}`;
    const cached = await Cache.get<SearchResponse>(cacheKey);
    if (cached) return cached;

    const data = await search(query, page, limit);
    await Cache.set(cacheKey, data, 10800);
    return data;
  }

  // Sources with 1h cache
  async getSources(
    id: string,
    episode: number,
    audioType: "sub" | "dub" = "sub",
    serverName: SourceServer
  ): Promise<ExtractedSrc> {
    const cacheKey = `sources:${id}:${episode}:${audioType}:${serverName}`;
    const cached = await Cache.get<ExtractedSrc>(cacheKey);
    if (cached) return cached;

    const data = await getSources(id, episode, audioType, serverName);
    await Cache.set(cacheKey, data, 3600);
    return data;
  }
} 