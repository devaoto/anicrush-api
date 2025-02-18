import { LRUCache } from 'lru-cache';

const options = {
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 60, // 1 hour in milliseconds
  allowStale: false,
  updateAgeOnGet: true,
  updateAgeOnHas: false,
};

const lruCache = new LRUCache(options);

export default lruCache;
