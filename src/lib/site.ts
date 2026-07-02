export const site = {
  author: {
    alternateName: "Leo Petrovic",
    name: "Leo Petrović",
    url: "https://github.com/mapokapo",
  },
  defaultDescription:
    "Personal portfolio of Leo Petrović - computer science student, software developer, and technology enthusiast.",
  locale: "en_US",
  name: "Leo's Portfolio",
  url: "https://leopetrovic.vercel.app",
} as const;

export interface OgImage {
  height: number;
  url: string;
  width: number;
}

export type OgType = "article" | "website";

export function formatPageTitle(title?: string): string {
  if (!title || title === "Home") {
    return site.name;
  }

  return `${title} | ${site.name}`;
}
