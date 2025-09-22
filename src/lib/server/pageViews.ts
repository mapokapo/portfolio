import "server-only";
import admin from "@/lib/firebase.admin";
import { pageViewSchema, PageView } from "@/lib/schemas/pageView";

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

  const currentEntryResult = pageViewSchema.safeParse(currentEntryDoc.data());
  if (!currentEntryResult.success) {
    console.error(
      "Invalid page view entry in database:",
      currentEntryDoc.id,
      currentEntryResult.error
    );
    return null;
  }

  return { data: currentEntryResult.data, doc: currentEntryDoc };
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

export async function getPageViews() {
  const docs = (await admin.firestore().collection("pageViews").get()).docs;

  const pageViews = docs
    .map(doc => {
      const pageViewResult = pageViewSchema.safeParse(doc.data());
      if (!pageViewResult.success) {
        console.error(
          "Invalid page view entry in database:",
          doc.id,
          pageViewResult.error
        );
        return null;
      }
      return pageViewResult.data;
    })
    .filter((entry): entry is PageView => entry !== null);

  // Sort by ascending time
  if (pageViews.length > 1)
    pageViews.sort(
      (a, b) =>
        a.recordStartTimestamp.getTime() - b.recordStartTimestamp.getTime()
    );

  return pageViews;
}
