import { Metadata } from "next";

import iconMap from "@/lib/const/iconMap";
import { getTextData } from "@/lib/server/getTextData";

export const metadata: Metadata = {
  description: "A brief overview of my journey and experiences.",
  keywords: [
    "backstory",
    "journey",
    "experiences",
    "leo petrovic",
    "portfolio",
  ],
  openGraph: {
    description: "A brief overview of my journey and experiences.",
    images: [
      {
        alt: "My backstory",
        height: 600,
        url: "/assets/images/image.png",
        width: 800,
      },
    ],
    title: "My backstory",
  },
  title: "My backstory",
  twitter: {
    card: "summary_large_image",
    description: "A brief overview of my journey and experiences.",
    images: ["/assets/images/image.png"],
    title: "My backstory",
  },
};

export default async function Lore() {
  const textData = await getTextData();

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center gap-16 bg-slate-900 px-4 py-12 text-white sm:px-48">
      <h1 className="text-center text-4xl font-bold text-white sm:text-6xl">
        My backstory
      </h1>
      <div className="flex w-full flex-col gap-4 sm:gap-12">
        {textData.sections.map(s => (
          <article
            className="w-full"
            key={s.title}>
            <div className="flex flex-col gap-2 bg-slate-800 p-4 px-8 py-8 text-start shadow-md shadow-slate-800 sm:gap-8 sm:p-16">
              <div className="mb-3 flex w-full flex-col items-center gap-4 px-4 text-white sm:mb-0 sm:flex-row sm:px-0">
                <div className="-mb-2 text-5xl sm:text-5xl">
                  {iconMap[s.icon]}
                </div>
                <h3 className="text-center text-4xl sm:text-start sm:text-5xl">
                  {s.title}
                </h3>
              </div>
              <p
                className="block text-xl leading-8 text-white"
                dangerouslySetInnerHTML={{ __html: s.content }}></p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
