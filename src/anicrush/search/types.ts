import { z } from "zod";

const searchGenreSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
}).optional();

const searchItemSchema = z.object({
  id_number: z.number().optional(),
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
  aired_from: z.string().optional(),
  runtime: z.number().nullable().optional(),
  rating_type: z.string().optional(),
  has_sub: z.number().optional(),
  has_dub: z.number().optional(),
  mal_score: z.number().nullable().optional(),
  genres: searchGenreSchema.array().optional(),
  id: z.string().optional(),
}).passthrough();

export const searchResponseSchema = z.object({
  status: z.boolean().optional(),
  result: z.object({
    movies: searchItemSchema.array().optional(),
    totalItems: z.number().optional(),
    totalPages: z.number().optional(),
  }).optional(),
}).passthrough();

// Formatted schemas with camelCase
const formattedSearchGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const formattedSearchItemSchema = z.object({
  idNumber: z.number(),
  name: z.string(),
  nameEnglish: z.string(),
  slug: z.string(),
  type: z.string(),
  countryCode: z.string(),
  poster: z.string(),
  totalEpisodes: z.number().nullable(),
  latestEpisodeSub: z.number(),
  latestEpisodeDub: z.number(),
  airingStatus: z.enum(["Finished", "Airing", "Unknown"]),
  airedFrom: z.string(),
  runtime: z.number().nullable(),
  ratingType: z.string(),
  hasSub: z.boolean(),
  hasDub: z.boolean(),
  malScore: z.number().nullable(),
  genres: formattedSearchGenreSchema.array(),
  id: z.string(),
  urlId: z.string(),
});

export const formattedSearchResponseSchema = z.object({
  status: z.boolean(),
  results: formattedSearchItemSchema.array(),
  pagination: z.object({
    currentPage: z.number(),
    hasNextPage: z.boolean(),
    totalPages: z.number(),
    totalResults: z.number(),
  }),
});

export type SearchGenre = z.infer<typeof searchGenreSchema>;
export type SearchItem = z.infer<typeof searchItemSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;

export type FormattedSearchGenre = z.infer<typeof formattedSearchGenreSchema>;
export type FormattedSearchItem = z.infer<typeof formattedSearchItemSchema>;
export type FormattedSearchResponse = z.infer<typeof formattedSearchResponseSchema>;
