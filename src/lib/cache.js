// Cache configuration with TTL values
export const CACHE_CONFIG = {
  MEDIA_DATA: 24 * 60 * 60 * 1000,        // 24 hours
  EVENTS_MARKERS: 60 * 60 * 1000,         // 1 hour
  SERVICES: 24 * 60 * 60 * 1000,          // 24 hours
  YOUTUBE_JSON: 12 * 60 * 60 * 1000,      // 12 hours
  CLIENTS_DATA: 24 * 60 * 60 * 1000,      // 24 hours
};

// Simple in-memory cache store with TTL support
class CacheStore {
  constructor() {
    this.store = new Map();
  }

  /**
   * Store a value in the cache with a TTL
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, value, ttl) {
    this.store.set(key, {
      value,
      expireAt: Date.now() + ttl,
    });
  }

  /**
   * Retrieve a value from the cache
   * @param {string} key - Cache key
   * @returns {* | null} - Cached value or null if expired/not found
   */
  get(key) {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expireAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Check if a key exists and is not expired
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Clear a specific cache entry
   * @param {string} key - Cache key
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.store.clear();
  }

  /**
   * Get cache statistics (for debugging)
   * @returns {object} - Cache stats
   */
  getStats() {
    const now = Date.now();
    let expired = 0;
    let valid = 0;

    for (const entry of this.store.values()) {
      if (now > entry.expireAt) {
        expired++;
      } else {
        valid++;
      }
    }

    return {
      totalEntries: this.store.size,
      validEntries: valid,
      expiredEntries: expired,
    };
  }
}

// Singleton instance
const cacheInstance = new CacheStore();

export default cacheInstance;
