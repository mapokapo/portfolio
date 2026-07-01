import admin from "firebase-admin";
import { access } from "node:fs/promises";
import path from "node:path";

import { buildSizeSchema } from "../src/lib/schemas/buildSize";
import { formatBuildSize, measureBuildSize } from "./lib/measure-build-size";

const BUILD_OUTPUT_DIR = ".next";
const FIRESTORE_COLLECTION = "buildSize";
const FIRESTORE_DOCUMENT = "sizeBytes";

async function ensureBuildOutputExists(projectRoot: string) {
  try {
    await access(path.join(projectRoot, BUILD_OUTPUT_DIR));
  } catch {
    throw new Error(
      `Missing ${BUILD_OUTPUT_DIR}/ directory. Run "bun run build" first.`
    );
  }
}

function initializeFirebase(): admin.app.App | null {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (typeof key !== "string" || key.trim().length === 0) {
    return null;
  }

  try {
    const serviceAccount = JSON.parse(key) as admin.ServiceAccount;
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
    return null;
  }
}

async function main() {
  const projectRoot = process.cwd();
  const dryRun = process.argv.includes("--dry-run");

  await ensureBuildOutputExists(projectRoot);

  const buildSize = await measureBuildSize(projectRoot);
  const parsed = buildSizeSchema.parse(buildSize);

  console.log("Measured build size:");
  console.log(formatBuildSize(parsed));

  if (dryRun) {
    console.log("Dry run: not uploading to Firestore.");
    return;
  }

  const uploaded = await uploadBuildSize(parsed);
  if (uploaded) {
    console.log(
      `Uploaded to Firestore: ${FIRESTORE_COLLECTION}/${FIRESTORE_DOCUMENT}`
    );
  }
}

async function uploadBuildSize(buildSize: admin.firestore.DocumentData) {
  const app = initializeFirebase();
  if (!app) {
    console.log(
      "Skipping Firestore upload: FIREBASE_SERVICE_ACCOUNT_KEY is not set."
    );
    return false;
  }

  await app
    .firestore()
    .collection(FIRESTORE_COLLECTION)
    .doc(FIRESTORE_DOCUMENT)
    .set(buildSize, { merge: true });

  return true;
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
