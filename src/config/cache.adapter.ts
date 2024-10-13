import NodeCache from "node-cache";

/**
 * A cache adapter that uses the `node-cache` library to provide in-memory caching.
 * 
 * The cache has a default time-to-live (TTL) of 100 seconds and a check period of 120 seconds.
 * 
 * This cache adapter provides methods to get, set, delete, and flush cache entries, as well as
 * retrieve cache statistics.
 */
export class CacheAdapter {

    private static cache: NodeCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

    static get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    static set<T>(key: string, value: T, ttl: number = 3600): boolean {
        return this.cache.set(key, value, ttl);
    }

    static del(key: string): number {
        return this.cache.del(key);
    }

    static delByPattern(pattern: string): void {
        const keys = this.cache.keys().filter(key => key.startsWith(pattern));
        keys.forEach(key => this.cache.del(key));
    }

    static flush(): void {
        this.cache.flushAll();
    }

    static stats() {
        return this.cache.getStats();
    }

}

