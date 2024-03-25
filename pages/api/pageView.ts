import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebase";
import { PageView } from "../../utils/getEntries";

// 2 weeks
const ENTRY_MAX_AGE = 2 * 7 * 24 * 60 * 60 * 1000;
// 1 hour
const UPDATE_INTERVAL = 60 * 60 * 1000;

const deleteOldEntries = async (
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>
) => {
  const deleteOldEntriesBatch = admin.firestore().batch();
  (
    await collection
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
};

const getMostRecentEntry = async (
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>
) => {
  const currentEntryDoc = (
    await collection.orderBy("recordStartTimestamp", "asc").limitToLast(1).get()
  ).docs.at(0);

  if (currentEntryDoc === undefined || !currentEntryDoc.exists) {
    return null;
  }

  const currentEntry: PageView | null = {
    recordStartTimestamp: (
      currentEntryDoc.get("recordStartTimestamp") as admin.firestore.Timestamp
    ).toDate(),
    totalViews: currentEntryDoc.get("totalViews") as number,
  };
  return { data: currentEntry, doc: currentEntryDoc };
};

export async function updatePageViews() {
  const col = admin.firestore().collection("pageViews");

  // Remove entries older than 2 weeks
  await deleteOldEntries(col);

  // Get most recent entry from db or null if there are no entries
  const currentEntry = await getMostRecentEntry(col);

  // If it happened more than one hour ago or if there are no entries, add new entry within the last hour
  if (
    currentEntry === null ||
    Date.now() - currentEntry.data.recordStartTimestamp.getTime() >
      UPDATE_INTERVAL
  ) {
    // Add new entry (round timestamp down to hours)
    const newEntry: PageView = {
      recordStartTimestamp:
        currentEntry === null
          ? new Date(Date.now() - (Date.now() % UPDATE_INTERVAL))
          : new Date(
              currentEntry.data.recordStartTimestamp.getTime() +
                Math.floor(
                  (Date.now() -
                    currentEntry.data.recordStartTimestamp.getTime()) /
                    UPDATE_INTERVAL
                ) *
                  UPDATE_INTERVAL
            ),
      totalViews: 1,
    };
    await col.add(newEntry);
  } else {
    // Otherwise just increase total views of existing entry
    await currentEntry.doc.ref.update({
      totalViews: admin.firestore.FieldValue.increment(1),
    });
  }
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PageView[]>
) {
  await updatePageViews();

  // Return in response
  res.status(200).end();
}
