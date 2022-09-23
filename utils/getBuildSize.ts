import admin from "./firebase";
export interface SizeBytes {
  javascript: number;
  css: number;
  images: number;
}

export default async function getBuildSize(): Promise<SizeBytes> {
  const doc = await admin
    .firestore()
    .collection("buildSize")
    .doc("sizeBytes")
    .get();

  const sizesBytes: SizeBytes = doc.data() as SizeBytes;

  return sizesBytes;
}
