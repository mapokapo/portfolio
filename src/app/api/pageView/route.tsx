import { updatePageViews } from "@/lib/server/pageViews";
import { NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    console.log("Skipping page view increment in non-production env");
    return new Response(null, { status: 204 });
  }

  await updatePageViews();

  return new Response(null, { status: 204 });
}
