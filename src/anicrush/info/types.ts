import { z } from "zod";

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const producerSchema = z.object({
  id: z.number(),
  name: z.string(), 
  slug: z.string(),
});

const studioSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const scheduleSchema = z.object({
  episode_number: z.number(),
  episode_name: z.string().nullable(),
  datetime: z.string(),
});

const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_english: z.string(),
  number: z.number(),
  is_filler: z.number()
});

export const episodeResponseSchema = z.object({
  status: z.boolean(),
  result: z.record(z.string(), z.array(episodeSchema))
});

export const formattedEpisodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  nameEnglish: z.string(),
  number: z.number(),
  isFiller: z.boolean()
});

export const formattedEpisodeResponseSchema = z.object({
  status: z.boolean(),
  episodes: z.array(formattedEpisodeSchema)
});

const detailSchema = z.object({
  id_number: z.number(),
  mal_id: z.number(),
  al_id: z.number(),
  manga_ids: z.string().array(),
  name: z.string(),
  name_english: z.string(),
  name_synonyms: z.string().nullable(),
  name_japanese: z.string(),
  slug: z.string(),
  overview: z.string(),
  type: z.string(),
  country_code: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string().nullable(),
  total_episodes: z.number(),
  latest_episode_sub: z.number(),
  latest_episode_dub: z.number(),
  airing_status: z.number(),
  aired_from: z.string(),
  aired_to: z.string().nullable(),
  premiered_season: z.number(),
  premiered_year: z.number().nullable(),
  runtime: z.number(),
  rating_type: z.string(),
  has_sub: z.number(),
  has_dub: z.number(),
  mal_score: z.number().nullable(),
  quality: z.string(),
  genres: genreSchema.array(),
  producers: producerSchema.array(),
  studios: studioSchema.array(),
  videos: z.array(z.unknown()),
  id: z.string(),
  schedule: scheduleSchema.optional().nullable(),
  collection: z.number(),
  totalComment: z.number(),
});

export const detailResponseSchema = z.object({
  status: z.boolean(),
  result: detailSchema,
});

const formattedDetailSchema = z.object({
  idNumber: z.number(),
  idMal: z.number(),
  idAl: z.number(),
  mangaIds: z.string().array(),
  name: z.string(),
  nameEnglish: z.string(),
  nameSynonyms: z.string().nullable(),
  nameJapanese: z.string(),
  slug: z.string(),
  overview: z.string(),
  type: z.string(),
  countryCode: z.string(),
  poster: z.string(),
  backdrop: z.string().nullable(),
  totalEpisodes: z.number(),
  latestEpisodeSub: z.number(),
  latestEpisodeDub: z.number(),
  airingStatus: z.string(),
  airedFrom: z.string(),
  airedTo: z.string().nullable(),
  premieredSeason: z.number(),
  premieredYear: z.number().nullable(),
  runtime: z.number(),
  ratingType: z.string(),
  hasSub: z.boolean(),
  hasDub: z.boolean(),
  malScore: z.number().nullable(),
  quality: z.string(),
  genres: genreSchema.array(),
  producers: producerSchema.array(),
  studios: studioSchema.array(),
  videos: z.array(z.unknown()),
  id: z.string(),
  urlId: z.string(),
  schedule: scheduleSchema.optional().nullable(),
  collection: z.number(),
  totalComments: z.number(),
});

export const formattedDetailResponseSchema = z.object({
  status: z.boolean(),
  result: formattedDetailSchema,
});

export type Producer = z.infer<typeof producerSchema>;
export type Studio = z.infer<typeof studioSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type Detail = z.infer<typeof detailSchema>;
export type DetailResponse = z.infer<typeof detailResponseSchema>;
export type FormattedDetail = z.infer<typeof formattedDetailSchema>;
export type FormattedDetailResponse = z.infer<typeof formattedDetailResponseSchema>;
export type Episode = z.infer<typeof episodeSchema>;
export type EpisodeResponse = z.infer<typeof episodeResponseSchema>;
export type FormattedEpisode = z.infer<typeof formattedEpisodeSchema>;
export type FormattedEpisodeResponse = z.infer<typeof formattedEpisodeResponseSchema>;
