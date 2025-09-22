import { firestoreTimestamp } from "@/lib/schemas/firestoreTimestamp";
import z from "zod";

export const blogPostSchema = z.object({
  id: z.string().min(1),
  content: z.string().min(1),
  image: z.string(),
  published: firestoreTimestamp,
  title: z.string().min(1),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
