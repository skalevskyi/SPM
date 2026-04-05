type WindowEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, WindowEntry>();

const MAX_STORE_KEYS = 4000;

function pruneExpired(now: number): void {
  if (store.size < MAX_STORE_KEYS) return;
  for (const [k, v] of store) {
    if (now >= v.resetAt) {
      store.delete(k);
    }
  }
}

/**
 * Fixed-window rate limiter (in-memory). Suitable as a lightweight guard on serverless;
 * multiple instances do not share state — still reduces casual abuse.
 */
export function checkLeadRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; remainingMs?: number } {
  const now = Date.now();
  pruneExpired(now);

  let entry = store.get(key);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remainingMs: Math.max(0, entry.resetAt - now) };
  }

  entry.count += 1;
  return { allowed: true };
}
