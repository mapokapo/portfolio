import type { ImageMetadata } from "astro";

import { getImage } from "astro:assets";

import og from "./og.webp";

export const defaultOgImage: ImageMetadata = og;

export async function getDefaultOgImageUrl(width = 1200): Promise<string> {
  const optimized = await getImage({
    format: "webp",
    src: og,
    width,
  });

  return optimized.src;
}
