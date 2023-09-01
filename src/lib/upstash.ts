// source: https://github.com/steven-tey/extrapolate/blob/main/lib/upstash.ts

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { customAlphabet } from "nanoid";

// Initiate Redis instance
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export async function setRandomKey(): Promise<{ key: string }> {
  /* recursively set link till successful */
  const key = nanoid();
  const response = await redis.set(
    key,
    { output: null },
    {
      nx: true,
    },
  );
  if (response !== "OK") {
    // by the off chance that key already exists
    return setRandomKey();
  } else {
    return { key };
  }
}
