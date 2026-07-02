import type { ImageMetadata } from "astro";

import { getImage } from "astro:assets";

import aNewSection from "./a-new-section.webp";
import massiveOverhaulNextjs15 from "./massive-overhaul-nextjs-15.webp";
import migrationToFirebase from "./migration-to-firebase.webp";
import pleasantryFixes from "./pleasantry-fixes.webp";
import upgradeAndRedesign from "./upgrade-and-redesign.webp";
import websiteFinished from "./website-finished.webp";

export const blogImages = {
  "a-new-section": aNewSection,
  "massive-overhaul-nextjs-15": massiveOverhaulNextjs15,
  "migration-to-firebase": migrationToFirebase,
  "pleasantry-fixes": pleasantryFixes,
  "upgrade-and-redesign": upgradeAndRedesign,
  "website-finished": websiteFinished,
} as const satisfies Record<string, ImageMetadata>;

export type BlogPostId = keyof typeof blogImages;

interface BlogImageUrlOptions {
  height?: number;
  width?: number;
}

export function getBlogImage(id: string): ImageMetadata | undefined {
  return blogImages[id as BlogPostId];
}

export async function getBlogImageUrl(
  id: string,
  { height, width = 768 }: BlogImageUrlOptions = {}
): Promise<string | undefined> {
  const src = getBlogImage(id);
  if (!src) {
    return undefined;
  }

  const optimized = await getImage({
    format: "webp",
    height,
    src,
    width,
  });

  return optimized.src;
}

export function hasBlogImage(id: string): id is BlogPostId {
  return id in blogImages;
}
