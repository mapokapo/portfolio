import { revalidateTag } from "next/cache";

import { updatePageViews } from "@/lib/server/pageViews";
import { DYNAMIC_CONTENT_CACHE_TAGS } from "@/lib/server/revalidation";

export async function POST() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Skipping page view increment in non-production env");
    return new Response(null, { status: 204 });
  }

  await updatePageViews();
  revalidateTag(DYNAMIC_CONTENT_CACHE_TAGS.pageViews, "max");

  return new Response(null, { status: 204 });
}
