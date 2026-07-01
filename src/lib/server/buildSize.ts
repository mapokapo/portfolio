import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { getFirebaseAdmin } from "@/lib/firebase.admin";
import { BuildSize, buildSizeSchema } from "@/lib/schemas/buildSize";
import {
  DYNAMIC_CONTENT_CACHE_TAGS,
  DYNAMIC_CONTENT_REVALIDATE_SECONDS,
} from "@/lib/server/revalidation";

export async function getBuildSize(): Promise<"unavailable" | BuildSize> {
  "use cache";
  cacheLife({ revalidate: DYNAMIC_CONTENT_REVALIDATE_SECONDS });
  cacheTag(DYNAMIC_CONTENT_CACHE_TAGS.buildSize);

  const admin = getFirebaseAdmin();
  if (!admin) {
    return "unavailable";
  }

  const doc = await admin
    .firestore()
    .collection("buildSize")
    .doc("sizeBytes")
    .get();

  const buildSizeResult = buildSizeSchema.safeParse(doc.data());

  if (!buildSizeResult.success) {
    console.error("Build size data is invalid:", buildSizeResult.error);
    return { css: 0, js: 0, media: 0 };
  }

  return buildSizeResult.data;
}
