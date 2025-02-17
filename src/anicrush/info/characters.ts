// https://api.anicrush.to/shared/v2/movie/characters?_movieId=O2xAxb&limit=6&page=1

import { anicrushApi } from "../utils";

export const getCharacters = async (id: string, limit = 6, page = 1) => {
    const response = await anicrushApi.get(`shared/v2/movie/characters?_movieId=${id}&limit=${limit}&page=${page}`);
    return await response.json();
}

// console.log(await getCharacters("O2xAxb"));