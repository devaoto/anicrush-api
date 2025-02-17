import { getDetail } from "./detail";
import { getEpisodes } from "./episodes";
import { getCharacters } from "./characters";

export const getInfo = async (id: string) => {
    const [detail, episodes, characters] = await Promise.all([getDetail(id), getEpisodes(id), getCharacters(id, 10000, 1)]);
    return { detail, episodes, characters };
}

export * from "./types";

export { getDetail, getEpisodes, getCharacters };

console.dir(await getInfo("vRPjMA"), { depth: null });

