import { anicrushApi } from "../utils";
import { getMegacloudSources } from "./extractors";
import type { ExtractedSrc } from "./extractors/megacloud/types";
import { serverResponseSchema, sourceServers, type ServerResponse, type SourceServer } from "./types";

export const getServers = async (movieId: string, episode = 1) => {
    const response = await anicrushApi.get<ServerResponse>(`shared/v2/episode/servers?_movieId=${movieId}&ep=${episode === 0 ? 1 : episode}`);
    const data = await response.json();

    return serverResponseSchema.parse(data);
};

export const getServer = async (movieId: string, episode = 1, audioType: "sub" | "dub" = "sub", serverName: SourceServer) => {
    const servers = await getServers(movieId, episode);
    const serverNumber = sourceServers[serverName];
    const foundServer = servers.result[audioType].find((server) => server.server === serverNumber);

    if (!foundServer) throw new Error(`Server not found: ${serverName}`);

    return foundServer;
};

export const getSources = async (movieId: string, episode = 1, audioType: "sub" | "dub" = "sub", serverName: SourceServer = "Megacloud") => {
    const serverNumber = sourceServers[serverName];
    const response = await anicrushApi.get(`shared/v2/episode/sources?_movieId=${movieId}&ep=${episode}&sv=${serverNumber}&sc=${audioType}`);
    const data = await response.json<{
        status: boolean;
        result: {
            type: string;
            link: string;
            server: number;
        };
    }>();

    if (data.result.server === sourceServers.Megacloud) {
        const defaultSources: ExtractedSrc = {
            tracks: [],
            intro: { start: 0, end: 0 },
            outro: { start: 0, end: 0 },
            sources: [],
        } as const;

        try {
            const videoId = new URL(data.result.link).pathname.split("/").pop();

            if (!videoId || typeof videoId !== "string") {
                throw new Error("Invalid source URL");
            }

            const extractedSource = await getMegacloudSources(videoId);

            if (!extractedSource) return defaultSources;

            return {
                sources: Array.isArray(extractedSource.sources) 
                    ? extractedSource.sources.map(source => ({
                        file: source.file,
                        type: source.type,
                    }))
                    : [],
                intro: extractedSource.intro ?? defaultSources.intro,
                outro: extractedSource.outro ?? defaultSources.outro,
                tracks: extractedSource.tracks ?? [],
            } as const as ExtractedSrc;
        } catch (error) {
            console.error(error);
            return defaultSources;
        }
    }

    throw new Error("Unsupported server");
};

// console.dir(await getSources("R0CZD5", 1, "sub", "Megacloud"), { depth: null });
