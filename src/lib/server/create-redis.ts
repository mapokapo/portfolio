import { Redis } from "@upstash/redis";

export function createRedis(url?: string, token?: string) {
  return url && token ? new Redis({ token, url }) : null;
}
