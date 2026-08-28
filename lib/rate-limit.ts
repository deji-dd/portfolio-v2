import { LRUCache } from "lru-cache";

interface RateLimitOptions {
  uniqueTokenPerInterval?: number;
  interval?: number;
}

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache<string, number>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string): Promise<void> =>
      new Promise<void>((resolve, reject) => {
        const interval = options?.interval || 60000;
        const windowStart = Math.floor(Date.now() / interval);
        const key = `${token}:${windowStart}`;

        const currentUsage = (tokenCache.get(key) || 0) + 1;
        tokenCache.set(key, currentUsage);

        if (currentUsage > limit) {
          reject(new Error("Rate limit exceeded"));
        } else {
          resolve();
        }
      }),
  };
}
