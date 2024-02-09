import puppeteer from 'puppeteer';
import waitFor from '../utils/waitFor';
import { load } from 'cheerio';

interface SearchData {
  id?: string;
  title?: string;
  image?: string;
  type?: string;
  duration?: string;
  totalEpisodes?: {
    sub?: number;
    dub?: number;
  };
}

export const search = async (query: string) => {
  try {
    const browser = await puppeteer.launch({ headless: 'shell' });

    let searchData: SearchData[] = [];

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    );

    await page.goto(`https://anicrush.to/search?keyword=${query}`);

    await waitFor(2000);

    const content = await page.content();

    const $ = load(content);

    $(
      '#category_page > div.row-base-content > div.anime-grid-basic > div'
    ).each((index, element) => {
      const id = $(element)
        .find('a.anime-thumbnail')
        .attr('href')
        ?.split('/')[2]
        ?.replace(/\?ref=search/g, '');
      const title = $(element).find('h3.anime-name > a').text();
      const image = $(element).find('img.anime-thumbnail-img').attr('src');
      const type = $(element).find('div.item.item-quality').text();
      const duration = $(element).find('div.item.item-dura').text();
      const totalEpisodesSub = Number(
        $(element).find('div.item.item-flex.item-sub > div.name').text()
      );
      const totalEpisodesDub = Number(
        $(element).find('div.item.item-flex.item-dub > div.name').text()
      );

      const totalEpisodes = {
        sub: totalEpisodesSub,
        dub: totalEpisodesDub,
      };

      searchData.push({ id, title, image, type, duration, totalEpisodes });
    });

    await browser.close()

    return searchData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
