import { anicrushApi, getImage } from "../utils";
import { detailResponseSchema, formattedDetailResponseSchema } from "./types";

export const getDetail = async (id: string) => {
    const response = await anicrushApi.get(`shared/v2/movie/getById/${id}`);
    const data = await response.json();

    const parsed = detailResponseSchema.parse(data);

    const formatted = formattedDetailResponseSchema.parse({
        status: parsed.status,
        result: {
            idNumber: parsed.result.id_number,
            idMal: parsed.result.mal_id,
            idAl: parsed.result.al_id,
            mangaIds: parsed.result.manga_ids,
            name: parsed.result.name,
            nameEnglish: parsed.result.name_english,
            nameSynonyms: parsed.result.name_synonyms,
            nameJapanese: parsed.result.name_japanese,
            slug: parsed.result.slug,
            overview: parsed.result.overview,
            type: parsed.result.type,
            countryCode: parsed.result.country_code,
            poster: getImage(parsed.result.poster_path),
            backdrop: parsed.result.backdrop_path ? getImage(parsed.result.backdrop_path, "banner") : null,
            totalEpisodes: parsed.result.total_episodes,
            latestEpisodeSub: parsed.result.latest_episode_sub,
            latestEpisodeDub: parsed.result.latest_episode_dub,
            airingStatus: String(parsed.result.airing_status),
            airedFrom: parsed.result.aired_from,
            airedTo: parsed.result.aired_to,
            premieredSeason: parsed.result.premiered_season,
            premieredYear: parsed.result.premiered_year,
            runtime: parsed.result.runtime,
            ratingType: parsed.result.rating_type,
            hasSub: Boolean(parsed.result.has_sub),
            hasDub: Boolean(parsed.result.has_dub),
            malScore: parsed.result.mal_score,
            quality: parsed.result.quality,
            genres: parsed.result.genres,
            producers: parsed.result.producers,
            studios: parsed.result.studios,
            videos: parsed.result.videos,
            id: parsed.result.id,
            urlId: `${parsed.result.slug}.${parsed.result.id}`,
            schedule: parsed.result.schedule,
            collection: parsed.result.collection,
            totalComments: parsed.result.totalComment
        }
    });

    return formatted;
}

// console.dir(await getDetail("O2xAxb"), { depth: null });