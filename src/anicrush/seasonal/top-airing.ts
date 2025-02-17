import { anicrushApi, getImage } from "../utils";
import { formattedSeasonalResponseSchema, seasonalResponseSchema } from "./types";

export const getTopAiring = async (limit: number = 20) => {
    const response = await anicrushApi.get('shared/v2/movie/topAiring', { searchParams: { type: "home" }});
    const data = await response.json();

    const parsed = seasonalResponseSchema.parse(data);
    const results = parsed.result || [];
    
    const limitedResults = limit ? results.slice(0, limit) : results;
    const totalResults = results.length;
    const totalPages = limit ? Math.ceil(totalResults / limit) : 1;
    const currentPage = 1;
    const hasNextPage = currentPage < totalPages;

    const formatted = formattedSeasonalResponseSchema.parse({
        status: parsed.status,
        results: limitedResults.map(item => ({
            idNumber: item.id_number,
            idMal: item.mal_id,
            name: item.name,
            nameEnglish: item.name_english,
            slug: item.slug,
            type: item.type,
            countryCode: item.country_code,
            poster: getImage(item.poster_path as string),
            totalEpisodes: item.total_episodes,
            latestEpisodeSub: item.latest_episode_sub,
            latestEpisodeDub: item.latest_episode_dub,
            airingStatus: item.airing_status,
            runtime: item.runtime,
            ratingType: item.rating_type,   
            genres: item.genres?.map(genre => ({
                id: genre?.id ?? 0,
                name: genre?.name ?? "",
                slug: genre?.slug ?? ""
            })) ?? [],
            urlId: `${item.slug}.${item.id}`,
            id: item.id
        })),
        pagination: {
            currentPage,
            hasNextPage,
            totalPages,
            totalResults
        }
    });

    return formatted;
}

// console.dir(await getTopAiring(), { depth: null });