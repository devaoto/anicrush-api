import { z } from "zod";

const streamServerSchema = z.object({
  name: z.string(),
  url: z.string().nullable(),
  type: z.string()
});

const serverSchema = z.object({
  server: z.number(),
  type: z.number(),
  hard_sub: z.number(),
  multiple_audio: z.number(),
  streamServer: streamServerSchema
});

export const serverResponseSchema = z.object({
  status: z.boolean(),
  result: z.object({
    sub: serverSchema.array(),
    dub: serverSchema.array()
  })
});

export type StreamServer = z.infer<typeof streamServerSchema>;
export type Server = z.infer<typeof serverSchema>;
export type ServerResponse = z.infer<typeof serverResponseSchema>;
export type SourceServer = "Megacloud" | "Southcloud";

export const sourceServers: Record<SourceServer, number> = {
    Megacloud: 4,
    Southcloud: 1
}

export type SourceServerType = typeof sourceServers[keyof typeof sourceServers];
