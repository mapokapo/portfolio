/* eslint-disable no-console */
import { access } from "node:fs/promises";
import path from "node:path";

import { buildSizeSchema } from "../src/lib/schemas/buildSize";
import { createRedis } from "../src/lib/server/create-redis";
import { formatBuildSize, measureBuildSize } from "./lib/measure-build-size";

const BUILD_OUTPUT_DIR = "dist";
const KEY = "buildSize";

async function ensureBuildOutputExists(projectRoot: string) {
  try {
    await access(path.join(projectRoot, BUILD_OUTPUT_DIR));
  } catch {
    throw new Error(
      `Missing ${BUILD_OUTPUT_DIR}/ directory. Run "bun run build" first.`
    );
  }
}

async function main() {
  const projectRoot = process.cwd();
  const dryRun = process.argv.includes("--dry-run");

  await ensureBuildOutputExists(projectRoot);

  const parsed = buildSizeSchema.parse(await measureBuildSize(projectRoot));

  console.log("Measured build size:");
  console.log(formatBuildSize(parsed));

  if (dryRun) {
    console.log("Dry run: not uploading to Upstash.");
    return;
  }

  const client = createRedis(
    process.env.KV_REST_API_URL,
    process.env.KV_REST_API_TOKEN
  );
  if (!client) {
    console.log(
      "Skipping upload: KV_REST_API_URL / KV_REST_API_TOKEN are not set."
    );
    return;
  }

  await client.set(KEY, parsed);
  console.log(`Uploaded to Upstash key "${KEY}"`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
