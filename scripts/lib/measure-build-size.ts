import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import type { BuildSize } from "../../src/lib/schemas/buildSize";

const MEDIA_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
  ".woff",
  ".woff2",
]);

type BuildSizeCategory = keyof BuildSize;

export function formatBuildSize(buildSize: BuildSize): string {
  const total = buildSize.css + buildSize.js + buildSize.media;

  return [
    `js:    ${buildSize.js.toLocaleString()} B`,
    `css:   ${buildSize.css.toLocaleString()} B`,
    `media: ${buildSize.media.toLocaleString()} B`,
    `total: ${total.toLocaleString()} B`,
  ].join("\n");
}

export async function measureBuildSize(
  projectRoot = process.cwd()
): Promise<BuildSize> {
  const totals: BuildSize = { css: 0, js: 0, media: 0 };

  await walkDirectory(path.join(projectRoot, ".next"), ".next", totals);
  await walkDirectory(path.join(projectRoot, "public"), "public", totals);

  return totals;
}

function getCategory(
  relativePath: string,
  extension: string
): BuildSizeCategory | null {
  const normalized = relativePath.replaceAll("\\", "/");

  if (extension === ".map") {
    return null;
  }

  if (normalized.startsWith(".next/server/")) {
    return null;
  }

  if (normalized.startsWith(".next/static/")) {
    if (extension === ".js") {
      return "js";
    }

    if (extension === ".css") {
      return "css";
    }

    if (MEDIA_EXTENSIONS.has(extension)) {
      return "media";
    }

    return null;
  }

  if (normalized.startsWith("public/") && MEDIA_EXTENSIONS.has(extension)) {
    return "media";
  }

  return null;
}

async function walkDirectory(
  rootDir: string,
  relativePrefix: string,
  totals: BuildSize
): Promise<void> {
  let entries;

  try {
    entries = await readdir(rootDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const absolutePath = path.join(rootDir, entry.name);
    const relativePath = path.posix.join(relativePrefix, entry.name);

    if (entry.isDirectory()) {
      await walkDirectory(absolutePath, relativePath, totals);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    const category = getCategory(relativePath, extension);

    if (!category) {
      continue;
    }

    const fileStat = await stat(absolutePath);
    totals[category] += fileStat.size;
  }
}
