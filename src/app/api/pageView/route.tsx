import { updatePageViews } from "@/lib/server/pageViews";

export async function POST() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Skipping page view increment in non-production env");
    return new Response(null, { status: 204 });
  }

  await updatePageViews();

  return new Response(null, { status: 204 });
}
