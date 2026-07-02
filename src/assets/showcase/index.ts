import type { ImageMetadata } from "astro";

import diaspora from "./diaspora.webp";
import edulink from "./edulink.webp";
import fitquest from "./fitquest.webp";
import fsreApp from "./fsre-app.webp";
import fsreTimetableNotify from "./fsre-timetable-notify.webp";
import landmarksAr from "./landmarks-ar.webp";
import luckySix from "./lucky-six.webp";
import nexora from "./nexora.webp";
import redditClone from "./reddit-clone.webp";
import riskfactor from "./riskfactor.webp";
import sportsmart from "./sportsmart.webp";

export const showcaseImages = {
  diaspora,
  edulink,
  fitquest,
  "fsre-app": fsreApp,
  "fsre-timetable-notify": fsreTimetableNotify,
  "landmarks-ar": landmarksAr,
  "lucky-six": luckySix,
  nexora,
  "reddit-clone": redditClone,
  riskfactor,
  sportsmart,
} as const satisfies Record<string, ImageMetadata>;

export type ShowcaseImageKey = keyof typeof showcaseImages;

export function getShowcaseImage(key: string): ImageMetadata | undefined {
  return showcaseImages[key as ShowcaseImageKey];
}

export function hasShowcaseImage(key: string): key is ShowcaseImageKey {
  return key in showcaseImages;
}
