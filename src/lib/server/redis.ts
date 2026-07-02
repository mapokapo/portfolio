import { KV_REST_API_TOKEN, KV_REST_API_URL } from "astro:env/server";

import { createRedis } from "@/lib/server/create-redis";

export function redis() {
  return createRedis(KV_REST_API_URL, KV_REST_API_TOKEN);
}
