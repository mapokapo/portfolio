import { Redis } from "@upstash/redis";
import { KV_REST_API_TOKEN, KV_REST_API_URL } from "astro:env/server";

export function redis() {
  const url = KV_REST_API_URL;
  const token = KV_REST_API_TOKEN;
  return url && token ? new Redis({ token, url: KV_REST_API_URL }) : null;
}
