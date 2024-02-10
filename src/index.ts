import {
  type SearchData,
  type PopularData,
  type Info,
  fetchInfo,
  fetchPopular,
  search,
} from './module';

export default class AniCrush {
  private userAgent: string | undefined;
  constructor(userAgent?: string) {
    this.userAgent = userAgent;
  }

  public async fetchPopular(): Promise<PopularData[]> {
    return await fetchPopular(this.userAgent);
  }

  public async performSearch(query: string): Promise<SearchData[]> {
    return await search(query, this.userAgent);
  }

  public async fetchInfo(id: string): Promise<Info> {
    return await fetchInfo(id, this.userAgent);
  }
}
