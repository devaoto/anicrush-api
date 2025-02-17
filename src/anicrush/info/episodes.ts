
import { anicrushApi } from "../utils";
import { episodeResponseSchema, formattedEpisodeResponseSchema } from "./types";

export const getEpisodes = async (id: string) => {
    const response = await anicrushApi.get(`shared/v2/episode/list?_movieId=${id}`);
    const data = await response.json();

    const parsed = episodeResponseSchema.parse(data);

    const formatted = formattedEpisodeResponseSchema.parse({
        status: parsed.status,
        episodes: Object.values(parsed.result).flat().map((episode) => ({
            id: episode.id,
            name: episode.name,
            nameEnglish: episode.name_english,
            number: episode.number,
            isFiller: episode.is_filler === 1
        }))
    });

    return formatted;
}

// console.dir(await getEpisodes("O2xAxb"), { depth: null });
