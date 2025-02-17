import { z } from "zod";

const genreSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
}).optional();

const seasonalItemSchema = z.object({
  id_number: z.number().optional(),
  mal_id: z.number().optional(),
  name: z.string().optional(),
  name_english: z.string().optional(),
  slug: z.string().optional(),
  type: z.string().optional(),
  country_code: z.string().optional(),
  poster_path: z.string().optional(),
  total_episodes: z.number().nullable().optional(),
  latest_episode_sub: z.number().optional(),
  latest_episode_dub: z.number().optional(),
  airing_status: z.number().optional(),
  runtime: z.number().nullable().optional(),
  rating_type: z.string().optional(),
  genres: genreSchema.array().optional(),
  id: z.string().optional(),
}).passthrough();

export const seasonalResponseSchema = z.object({
  status: z.boolean().optional(),
  result: seasonalItemSchema.array().optional(),
}).passthrough();

// New formatted schemas with camelCase
const formattedGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const formattedSeasonalItemSchema = z.object({
  idNumber: z.number(),
  idMal: z.number().optional(),
  name: z.string(),
  nameEnglish: z.string(),
  slug: z.string(),
  type: z.string(),
  countryCode: z.string(),
  poster: z.string(),
  totalEpisodes: z.number().nullable(),
  latestEpisodeSub: z.number(),
  latestEpisodeDub: z.number(),
  airingStatus: z.number(),
  runtime: z.number().nullable(),
  ratingType: z.string(),
  genres: formattedGenreSchema.array(),
  id: z.string(),
  urlId: z.string(),
});

export const formattedSeasonalResponseSchema = z.object({
  status: z.boolean(),
  results: formattedSeasonalItemSchema.array(),
  pagination: z.object({
    currentPage: z.number(),
    hasNextPage: z.boolean(),
    totalPages: z.number(),
    totalResults: z.number(),
  }),
});

export type Genre = z.infer<typeof genreSchema>;
export type SeasonalItem = z.infer<typeof seasonalItemSchema>;
export type SeasonalResponse = z.infer<typeof seasonalResponseSchema>;

export type FormattedGenre = z.infer<typeof formattedGenreSchema>;
export type FormattedSeasonalItem = z.infer<typeof formattedSeasonalItemSchema>;
export type FormattedSeasonalResponse = z.infer<typeof formattedSeasonalResponseSchema>;