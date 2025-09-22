import z from "zod";

import { firestoreTimestamp } from "@/lib/schemas/firestoreTimestamp";

export const pageViewSchema = z.object({
  recordStartTimestamp: firestoreTimestamp,
  totalViews: z.number().min(0),
});

export type PageView = z.infer<typeof pageViewSchema>;
