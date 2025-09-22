import z from "zod";

export const buildSizeSchema = z.object({
  css: z.number().min(0),
  js: z.number().min(0),
  media: z.number().min(0),
});

export type BuildSize = z.infer<typeof buildSizeSchema>;
