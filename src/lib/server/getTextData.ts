import "server-only";
import { cacheLife } from "next/cache";
import { readFile } from "node:fs/promises";
import path from "node:path";

import TextData from "@/lib/types/TextData";

export async function getTextData() {
  "use cache";
  cacheLife("max");

  const textData = await readFile(
    path.join(process.cwd(), "src", "lib", "const", "data.json"),
    "utf-8"
  );
  return JSON.parse(textData) as TextData;
}
