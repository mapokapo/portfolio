import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebase";
import { PageView } from "../../utils/getEntries";

// 2 weeks
const ENTRY_MAX_AGE = 2 * 7 * 24 * 60 * 60 * 1000;
// 1 hour
const UPDATE_INTERVAL = 60 * 60 * 1000;

export async function updatePageViews() {
  const col = admin.firestore().collection("pageViews");

  // Remove entries older than 2 weeks
  const deleteOldEntriesBatch = admin.firestore().batch();
  (
    await col
      .where(
        "recordStartTimestamp",
        "<",
        admin.firestore.Timestamp.fromMillis(Date.now() - ENTRY_MAX_AGE)
      )
      .get()
  ).docs.forEach(doc => {
    deleteOldEntriesBatch.delete(doc.ref);
  });
  await deleteOldEntriesBatch.commit();

  // Get most recent entry from db
  const currentEntryDoc = (
    await col.orderBy("recordStartTimestamp", "asc").limitToLast(1).get()
  ).docs.at(0);
  const currentEntry: PageView | null =
    currentEntryDoc !== undefined && currentEntryDoc.exists
      ? {
          recordStartTimestamp: (
            currentEntryDoc.get(
              "recordStartTimestamp"
            ) as admin.firestore.Timestamp
          ).toDate(),
          totalViews: currentEntryDoc.get("totalViews") as number,
        }
      : null;

  // If it happened more than one hour ago or if there are no entries
  if (
    currentEntry === null ||
    Date.now() - currentEntry.recordStartTimestamp.getTime() > UPDATE_INTERVAL
  ) {
    // Add new entry (round timestamp down to hours)
    const newEntry: PageView = {
      recordStartTimestamp:
        currentEntry === null
          ? new Date(Date.now() - (Date.now() % UPDATE_INTERVAL))
          : new Date(
              currentEntry.recordStartTimestamp.getTime() +
                Math.floor(
                  (Date.now() - currentEntry.recordStartTimestamp.getTime()) /
                    UPDATE_INTERVAL
                ) *
                  UPDATE_INTERVAL
            ),
      totalViews: 1,
    };
    await col.add(newEntry);
  } else {
    if (currentEntryDoc === undefined) return;
    // Otherwise just increase total views of existing entry
    await currentEntryDoc.ref.update({
      totalViews: admin.firestore.FieldValue.increment(1),
    });
  }

  // Normalize entries
  /*let normalized = false;
  for (let i = 0; i < entries.length; i++) {
    // Compare 2 entries
    const current = entries[i];
    const next = entries[i + 1];
    if (next === undefined) break;
    // Calculate how many hours are missing (0 if none)
    const diffHours = Math.floor(
      (next.recordStartTimestamp.getTime() -
        current.recordStartTimestamp.getTime() -
        1) /
        UPDATE_INTERVAL
    );

    // Add an entry for each missing hour
    for (let j = 1; j <= diffHours; j++) {
      const newEntry: PageView = {
        recordStartTimestamp: new Date(
          current.recordStartTimestamp.getTime() + j * UPDATE_INTERVAL
        ),
        totalViews: 0,
      };
      entries.push(newEntry);
      normalized = true;
    }
  }

  // Sort entries if normalized
  if (normalized && entries.length > 1) {
    entries.sort(
      (a, b) =>
        a.recordStartTimestamp.getTime() - b.recordStartTimestamp.getTime()
    );
  }*/
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PageView[]>
) {
  await updatePageViews();

  // Return in response
  res.status(200).end();
}
