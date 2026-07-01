import "server-only";

import type admin from "firebase-admin";

import { cacheLife, cacheTag } from "next/cache";

import { getFirebaseAdmin } from "@/lib/firebase.admin";
import { PageView, pageViewSchema } from "@/lib/schemas/pageView";
import {
  DYNAMIC_CONTENT_CACHE_TAGS,
  DYNAMIC_CONTENT_REVALIDATE_SECONDS,
} from "@/lib/server/revalidation";

// 2 weeks
const ENTRY_MAX_AGE = 2 * 7 * 24 * 60 * 60 * 1000;
// 1 hour
const UPDATE_INTERVAL = 60 * 60 * 1000;
const DEFAULT_PAGE_VIEW_HOURS = 24;

type CachedPageView = Omit<PageView, "recordStartTimestamp"> & {
  recordStartTimestamp: string;
};

function deserializePageView(entry: CachedPageView): PageView {
  return {
    ...entry,
    recordStartTimestamp: new Date(entry.recordStartTimestamp),
  };
}

function getDefaultPageViews(): PageView[] {
  const now = Date.now();
  const alignedNow = now - (now % UPDATE_INTERVAL);

  return Array.from({ length: DEFAULT_PAGE_VIEW_HOURS }, (_, index) => ({
    recordStartTimestamp: new Date(
      alignedNow - (DEFAULT_PAGE_VIEW_HOURS - 1 - index) * UPDATE_INTERVAL
    ),
    totalViews: 0,
  }));
}

function serializePageView(entry: PageView): CachedPageView {
  return {
    ...entry,
    recordStartTimestamp: entry.recordStartTimestamp.toISOString(),
  };
}

const deleteOldEntries = async (
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>
) => {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return;
  }

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

  if (!currentEntryDoc?.exists) {
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

export async function getPageViews(): Promise<PageView[]> {
  "use cache";
  cacheLife({ revalidate: DYNAMIC_CONTENT_REVALIDATE_SECONDS });
  cacheTag(DYNAMIC_CONTENT_CACHE_TAGS.pageViews);

  const admin = getFirebaseAdmin();
  if (!admin) {
    return getDefaultPageViews();
  }

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
      return serializePageView(pageViewResult.data);
    })
    .filter((entry): entry is CachedPageView => entry !== null);

  if (pageViews.length > 1) {
    pageViews.sort(
      (a, b) =>
        new Date(a.recordStartTimestamp).getTime() -
        new Date(b.recordStartTimestamp).getTime()
    );
  }

  return pageViews.map(deserializePageView);
}

export async function updatePageViews() {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return;
  }

  const col = admin.firestore().collection("pageViews");

  await deleteOldEntries(col);

  const currentEntry = await getMostRecentEntry(col);

  if (
    currentEntry === null ||
    Date.now() - currentEntry.data.recordStartTimestamp.getTime() >
      UPDATE_INTERVAL
  ) {
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
    await currentEntry.doc.ref.update({
      totalViews: admin.firestore.FieldValue.increment(1),
    });
  }
}
