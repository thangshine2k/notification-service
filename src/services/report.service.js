import { users } from "../db/user.db.js";
import pLimit from "p-limit";

const limit = pLimit(10);
const cache = new Map();

const CACHE_TTL = 30 * 1000;

const getCached = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    expiry: Date.now() + CACHE_TTL,
  });
};

const fetchWithCache = async (url, userId) => {
  const cacheKey = `user:${userId}`;

  const cached = getCached(cacheKey);
  if (cached) {
    return cached;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();

    setCache(cacheKey, data);

    return data;
  } catch (err) {
    const fallback = { activity_count: null };

    if (!getCached(cacheKey)) {
      setCache(cacheKey, fallback);
    }

    return fallback;
  } finally {
    clearTimeout(timeout);
  }
};

export const getReport = async () => {
  const baseUrl = "http://localhost:3000/mock/external";

  const promises = users.map((user) =>
    limit(() => fetchWithCache(`${baseUrl}/${user.id}`, user.id)),
  );

  const results = await Promise.allSettled(promises);

  return users.map((user, i) => ({
    ...user,
    activity_count:
      results[i].status === "fulfilled"
        ? results[i].value.activity_count
        : null,
  }));
};
