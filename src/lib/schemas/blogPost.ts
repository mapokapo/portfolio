import z from "zod";

import { firestoreTimestamp } from "@/lib/schemas/firestoreTimestamp";

export const blogPostSchema = z.object({
  content: z.string().min(1),
  id: z.string().min(1),
  image: z.string(),
  published: firestoreTimestamp,
  title: z.string().min(1),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
