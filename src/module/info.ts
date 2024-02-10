import puppeteer from 'puppeteer';
import waitFor from '../utils/waitFor';
import { load } from 'cheerio';
import repeat from 'repeat.js';

export interface Info {
  id?: string;
  title?: string;
  titleJapanese?: string;
  image?: string;
  description?: string;
  aired?: string;
  duration?: string;
  malScore?: number;
  quality?: string;
  rating?: string;
  genres?: string[];
  producers?: string[];
  studios?: string[];
  totalEpisodes?: {
    sub?: number;
    dub?: number;
  };
  episodes?: {
    id: string;
    episodeNumber: number;
  }[];
  characters?: Character[];
}

interface Character {
  characterImage?: string;
  characterName?: string;
  characterRole?: string;
  voiceActorImages?: string[];
}

export const fetchInfo = async (
  id: string,
  userAgent?: string
): Promise<Info> => {
  try {
    const browser = await puppeteer.launch({ headless: 'shell' });
    const page = await browser.newPage();

    let characterData: Character[] = [];
    let genres: string[] | undefined = [];
    let studios: string[] | undefined = [];
    let producers: string[] | undefined = [];

    let ua: string;

    if (userAgent) ua = userAgent;
    else
      ua =
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

    await page.setUserAgent(ua);

    await page.goto(`https://anicrush.to/detail/${id}`);

    await waitFor(2000);

    const content = await page.content();

    const $ = load(content);

    const title = $('div.heading > div.main > h2').text();
    const image = $('img.anime-thumbnail-img').attr('src');
    const rating = $('div.heading > div.main > div > div:nth-child(1)').text();
    const quality = $('div.heading > div.main > div > div:nth-child(2)').text();

    const totalEpisodesDub = Number(
      $('div.item.item-flex.item-dub > div.name').text()
    );
    const totalEpisodesSub = Number(
      $('div.item.item-flex.item-sub > div.name').text()
    );

    const totalEpisodes = {
      sub: totalEpisodesSub,
      dub: totalEpisodesDub,
    };

    const description = $('div.synopsis.mb-5 > div > p').text();

    const characters = $('.character-list .item');

    const titleJapanese = $('div.e-info > div:nth-child(1) > span.name').text();
    const aired = $('div.e-info > div:nth-child(2) > span.name').text();
    const duration = $('div.e-info > div:nth-child(3) > span.name').text();
    const malScore = Number(
      $('div.e-info > div:nth-child(4) > span.name').text()
    );

    const genreList = $('div.e-info > div.item.item-list > div > a');
    const studioList = $(
      'div.e-info > div:nth-child(6) > span:nth-child(2) > a'
    );

    const producerList = $('div.e-info > div:nth-child(7) > span');

    genreList.each((index, element) => {
      genres?.push($(element).text());
    });

    studioList.each((index, element) => {
      studios?.push($(element).text());
    });

    producerList.each((index, element) => {
      const p = $(element)
        .text()
        .replace(/Producers:/g, '');

      producers?.push(p);
    });

    characters.each((index, element) => {
      const characterImage =
        $(element).find('.pi-detail .c-avatar img').attr('src') ?? '';
      const characterName =
        $(element).find('.pi-detail .pi-name a').text() || '';
      const characterRole = $(element).find('.pi-detail .pi-cast').text() || '';

      const voiceActors = $(element).find('.pix-list .c-avatar img');
      const voiceActorImages: string[] = [];

      voiceActors.each((index, actor) => {
        const voiceActorImage = $(actor).attr('src') ?? '';
        voiceActorImages.push(voiceActorImage);
      });

      characterData.push({
        characterName,
        characterImage,
        characterRole,
        voiceActorImages,
      });
    });

    const episodes: { id: string; episodeNumber: number }[] = [];

    repeat((episodeNumber: number) => {
      const episodeId = `${id}?ep=${episodeNumber + 1}`;
      episodes.push({
        id: episodeId,
        episodeNumber: episodeNumber + 1,
      });
    }, totalEpisodesSub);

    await browser.close();

    return {
      id,
      title,
      titleJapanese,
      image,
      description,
      aired,
      duration,
      malScore,
      rating,
      quality,
      characters: characterData,
      totalEpisodes,
      episodes,
      genres,
      studios,
      producers,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
