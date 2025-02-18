import { env } from "../env";
import redis from "./redis";
import lruCache from "./node";

export class Cache {
  static async get<T>(key: string): Promise<T | null> {
    if (env.USE_REDIS) {
      const value = await redis?.get(key);
      return value ? JSON.parse(value) : null;
    }
    return lruCache.get(key) as T | null;
  }

  static async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (env.USE_REDIS) {
      await redis?.set(key, JSON.stringify(value), 'EX', ttl || 3600);
    } else {
      lruCache.set(key, value as any, { ttl: ttl ? ttl * 1000 : undefined });
    }
  }

  static async del(key: string): Promise<void> {
    if (env.USE_REDIS) {
      await redis?.del(key);
    } else {
      lruCache.delete(key);
    }
  }

  static async has(key: string): Promise<boolean> {
    if (env.USE_REDIS) {
      return (await redis?.exists(key)) === 1;
    }
    return lruCache.has(key);
  }

  static async map<T>(keys: string[]): Promise<T[]> {
    const values: T[] = [];
    for (const key of keys) {
      values.push(await Cache.get(key) as T);
    }
    return values;
  }

  static async keys(): Promise<string[]> {
    if (env.USE_REDIS) {
      return await redis?.keys('*') || [];
    }
    return [...lruCache.keys()] as string[];
  }

  static async delAll(): Promise<void> {
    if (env.USE_REDIS) {
      const keys = await Cache.keys();
      if (keys.length) {
        await redis?.del(...keys);
      }
    } else {
      lruCache.clear();
    }
  }
}
