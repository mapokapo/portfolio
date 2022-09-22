import fs from "fs/promises";
import path from "path";

export interface PageView {
  recordStartTimestamp: number;
  totalViews: number;
}

export const UPDATE_INTERVAL = 60 * 60 * 1000;
export const ENTRY_MAX_AGE = 2 * 7 * 24 * 60 * 60 * 1000;
export const ENTRIES_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "pageViews.json"
);

export default async function getEntries() {
  const file = await fs.readFile(ENTRIES_FILE_PATH, "utf-8");
  const entries = JSON.parse(file) as PageView[];

  // Sort by ascending time
  entries.sort((a, b) => a.recordStartTimestamp - b.recordStartTimestamp);

  return entries;
}
