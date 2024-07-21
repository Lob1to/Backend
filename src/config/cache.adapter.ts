import NodeCache from "node-cache";

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

    static flush(): void {
        this.cache.flushAll();
    }

    static stats() {
        return this.cache.getStats();
    }

}

