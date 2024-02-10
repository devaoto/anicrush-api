import puppeteer from 'puppeteer';
import waitFor from '../utils/waitFor';
import { load } from 'cheerio';

export interface PopularData {
  id?: string;
  title?: string;
  image?: string;
  type?: string;
  totalEpisodes?: {
    sub?: number;
    dub?: number;
  };
}

export const fetchPopular = async (userAgent?: string) => {
  try {
    const browser = await puppeteer.launch({ headless: 'shell' });

    let popularData: PopularData[] = [];

    const page = await browser.newPage();
    let ua: string;

    if (userAgent) ua = userAgent;
    else
      ua =
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

    await page.setUserAgent(ua);

    await page.goto('https://anicrush.to/most-popular');

    await waitFor(2000);

    const content = await page.content();

    const $ = load(content);

    $('#popular_page > div.row-base-content > div > div > div').each(
      (index, element) => {
        const id = $(element)
          .find('a.anime-thumbnail')
          .attr('href')
          ?.split('/')[2];
        const title = $(element).find('h3.anime-name > a').text();
        const image = $(element).find('img.anime-thumbnail-img').attr('src');
        const type = $(element).find('div.item.item-quality').text();
        const totalEpisodesSub = Number(
          $(element).find('div.item.item-flex.item-sub > div.text').text()
        );
        const totalEpisodesDub = Number(
          $(element).find('div.item.item-flex.item-dub > div.text').text()
        );

        const totalEpisodes = {
          sub: totalEpisodesSub,
          dub: totalEpisodesDub,
        };

        popularData.push({ id, title, image, type, totalEpisodes });
      }
    );

    await browser.close();

    return popularData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
