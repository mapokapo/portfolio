import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

import TextData from "@/lib/types/TextData";

export async function getTextData() {
  const textData = await readFile(
    path.join(process.cwd(), "src", "lib", "const", "data.json"),
    "utf-8"
  );
  return JSON.parse(textData) as TextData;
}
