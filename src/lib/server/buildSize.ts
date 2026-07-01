import "server-only";

import { getFirebaseAdmin } from "@/lib/firebase.admin";
import { BuildSize, buildSizeSchema } from "@/lib/schemas/buildSize";

export async function getBuildSize(): Promise<"unavailable" | BuildSize> {
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
