import type { APIRoute } from "astro";

import { getSiteInfo } from "@/lib/server/siteInfo";

export const prerender = false;

export const GET: APIRoute = async () => {
  const siteInfo = await getSiteInfo();

  return new Response(JSON.stringify(siteInfo), {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "Content-Type": "application/json",
    },
  });
};
