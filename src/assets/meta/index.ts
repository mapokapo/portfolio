import type { ImageMetadata } from "astro";

import { getImage } from "astro:assets";

import type { OgImage } from "@/lib/site";

import og from "./og.webp";

export const defaultOgImage: ImageMetadata = og;

const defaultOgWidth = 1200;

export async function getDefaultOgImage(
  width = defaultOgWidth
): Promise<OgImage> {
  const optimized = await getImage({
    format: "webp",
    src: og,
    width,
  });

  return {
    height: Number(optimized.attributes.height ?? Math.round((og.height / og.width) * width)),
    url: optimized.src,
    width: Number(optimized.attributes.width ?? width),
  };
}

export async function getDefaultOgImageUrl(width = defaultOgWidth): Promise<string> {
  const image = await getDefaultOgImage(width);
  return image.url;
}
