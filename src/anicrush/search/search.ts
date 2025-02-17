import { anicrushApi, formatStatus, getImage } from "../utils";
import { searchResponseSchema, formattedSearchResponseSchema } from "./types";

export const searchAutoComplete = async (query: string) => {
    const response = await anicrushApi.get(`shared/v2/movie/list?keyword=${encodeURIComponent(query)}&limit=5`);
    const data = await response.json();

    const parsed = searchResponseSchema.parse(data);
    const results = parsed.result?.movies || [];

    const formatted = formattedSearchResponseSchema.parse({
        status: parsed.status || false,
        results: results.map(item => ({
            idNumber: item.id_number || 0,
            name: item.name || "",
            nameEnglish: item.name_english || "",
            slug: item.slug || "",
            type: item.type || "",
            countryCode: item.country_code || "",
            poster: getImage(item.poster_path || ""),
            totalEpisodes: item.total_episodes || null,
            latestEpisodeSub: item.latest_episode_sub || 0,
            latestEpisodeDub: item.latest_episode_dub || 0,
            airingStatus: formatStatus(item.airing_status || 0),
            airedFrom: item.aired_from || "",
            runtime: item.runtime || null,
            ratingType: item.rating_type || "",
            hasSub: item.has_sub === 1,
            hasDub: item.has_dub === 1,
            malScore: item.mal_score || null,
            genres: item.genres?.map(genre => ({
                id: genre?.id || 0,
                name: genre?.name || "",
                slug: genre?.slug || ""
            })) || [],
            id: `${item.slug}.${item.id}`
        })),
        pagination: {
            currentPage: 1, // Search autocomplete is always one.
            hasNextPage: parsed.result?.totalPages && parsed.result?.totalPages > 1 ? true : false,
            totalPages: parsed.result?.totalPages || 0,
            totalResults: parsed.result?.totalItems || 0
        }
    });

    return formatted;
}

export const search = async (query: string, page: number = 1, limit: number = 20) => {
    const response = await anicrushApi.get(`shared/v2/movie/list?keyword=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    const data = await response.json();

    const parsed = searchResponseSchema.parse(data);
    const results = parsed.result?.movies || [];

    const formatted = formattedSearchResponseSchema.parse({
        status: parsed.status || false,
        results: results.map(item => ({
            idNumber: item.id_number || 0,
            name: item.name || "",
            nameEnglish: item.name_english || "",
            slug: item.slug || "",
            type: item.type || "",
            countryCode: item.country_code || "",
            poster: getImage(item.poster_path || ""),
            totalEpisodes: item.total_episodes || null,
            latestEpisodeSub: item.latest_episode_sub || 0,
            latestEpisodeDub: item.latest_episode_dub || 0,
            airingStatus: formatStatus(item.airing_status || 0),
            airedFrom: item.aired_from || "",
            runtime: item.runtime || null,
            ratingType: item.rating_type || "",
            hasSub: item.has_sub === 1,
            hasDub: item.has_dub === 1,
            malScore: item.mal_score || null,
            genres: item.genres?.map(genre => ({
                id: genre?.id || 0,
                name: genre?.name || "",
                slug: genre?.slug || ""
            })) || [],
            id: `${item.slug}.${item.id}`
        })),
        pagination: {
            currentPage: page,
            hasNextPage: parsed.result?.totalPages && parsed.result?.totalPages > page ? true : false,
            totalPages: parsed.result?.totalPages || 0,
            totalResults: parsed.result?.totalItems || 0
        }
    });

    return formatted;
}

// console.dir(await search("Im getting married to a girl I hate most in my class", 2), { depth: null });