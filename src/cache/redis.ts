import { env } from "../env";
import { Redis, type RedisOptions } from "ioredis";

const redis = env.USE_REDIS ? env.REDIS_URL ? new Redis(env.REDIS_URL) : new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  username: env.REDIS_USER,
  password: env.REDIS_PASSWORD,
}) : null;

export default redis;
