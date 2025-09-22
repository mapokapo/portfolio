import { Timestamp } from "firebase-admin/firestore";
import z from "zod";

export const firestoreTimestamp = z
  .custom<Timestamp>(val => val instanceof Timestamp)
  .transform(val => val.toDate());

export type FirestoreTimestamp = z.infer<typeof firestoreTimestamp>;
