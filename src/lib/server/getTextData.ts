import "server-only";
import TextData from "@/lib/types/TextData";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getTextData() {
  const textData = await readFile(
    path.join(process.cwd(), "src", "lib", "const", "data.json"),
    "utf-8"
  );
  return JSON.parse(textData) as TextData;
}
