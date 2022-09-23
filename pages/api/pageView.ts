import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import getEntries, {
  ENTRIES_FILE_PATH,
  ENTRY_MAX_AGE,
  PageView,
  UPDATE_INTERVAL,
} from "../../utils/getEntries";

export async function updatePageViews() {
  // Read entries from fs
  let entries = await getEntries();

  // Remove entries older than 2 weeks
  entries = entries.filter(
    e => Date.now() - e.recordStartTimestamp < ENTRY_MAX_AGE
  );

  // Get most recent entry
  const currentEntry = entries.slice(-1)[0];

  // If it happened more than one hour ago or if there are no entries
  if (
    currentEntry === undefined ||
    Date.now() - currentEntry.recordStartTimestamp > UPDATE_INTERVAL
  ) {
    // Add new entry (round timestamp down to hours)
    const newEntry: PageView = {
      recordStartTimestamp:
        currentEntry === undefined
          ? Date.now() - (Date.now() % UPDATE_INTERVAL)
          : currentEntry.recordStartTimestamp +
            Math.floor(
              (Date.now() - currentEntry.recordStartTimestamp) / UPDATE_INTERVAL
            ) *
              UPDATE_INTERVAL,
      totalViews: 1,
    };
    entries.push(newEntry);
  } else {
    // Otherwise just increase total views of existing entry
    currentEntry.totalViews++;
  }

  // Normalize entries
  let normalized = false;
  for (let i = 0; i < entries.length; i++) {
    // Compare 2 entries
    const current = entries[i];
    const next = entries[i + 1];
    if (next === undefined) break;
    // Calculate how many hours are missing (0 if none)
    const diffHours = Math.floor(
      (next.recordStartTimestamp - current.recordStartTimestamp - 1) /
        UPDATE_INTERVAL
    );

    // Add an entry for each missing hour
    for (let j = 1; j <= diffHours; j++) {
      const newEntry: PageView = {
        recordStartTimestamp:
          current.recordStartTimestamp + j * UPDATE_INTERVAL,
        totalViews: 0,
      };
      entries.push(newEntry);
      normalized = true;
    }
  }

  // Sort entries if normalized
  if (normalized && entries.length > 1) {
    entries.sort((a, b) => a.recordStartTimestamp - b.recordStartTimestamp);
  }

  // Save to fs
  await fs.writeFile(ENTRIES_FILE_PATH, JSON.stringify(entries), "utf-8");

  return entries;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PageView[]>
) {
  const entries = await updatePageViews();

  // Return in response
  res.status(200).json(entries);
}
