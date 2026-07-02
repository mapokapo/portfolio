import type { APIRoute } from "astro";

import { recordPageView } from "@/lib/server/pageViews";

export const prerender = false;

export const POST: APIRoute = async () => {
  if (!import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.log("Skipping page view increment in non-production env");
    return new Response(null, { status: 204 });
  }

  await recordPageView();

  return new Response(null, { status: 204 });
};
