import "server-only";

import admin from "@/lib/firebase.admin";
import { buildSizeSchema } from "@/lib/schemas/buildSize";

export async function getBuildSize() {
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
