import admin from "./firebase";

export interface PageView {
  recordStartTimestamp: Date;
  totalViews: number;
}

export default async function getEntries() {
  const docs = (await admin.firestore().collection("pageViews").get()).docs;

  const entries: PageView[] = docs.map(doc => {
    const docData = doc.data();
    docData["recordStartTimestamp"] = (
      docData["recordStartTimestamp"] as admin.firestore.Timestamp
    ).toDate();
    return docData as PageView;
  });

  // Sort by ascending time
  if (entries.length > 1)
    entries.sort(
      (a, b) =>
        a.recordStartTimestamp.getTime() - b.recordStartTimestamp.getTime()
    );

  return entries;
}
