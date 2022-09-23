import fs from "fs/promises";
import path from "path";

export const BUILD_PATH = path.join(process.cwd(), ".next", "static");
export const CACHE_PATH = path.join(process.cwd(), ".next", "cache");
export const BUILD_SIZE_FILE = path.join(
  process.cwd(),
  "data",
  "buildSize.json"
);

export default async function getBuildSize(): Promise<{
  javascript: number;
  css: number;
  images: number;
} | null> {
  // Apparently Vercel doesn't use the same folder structure as local projects do, so this won't work for now

  /*const sizesBytes = {
    javascript: 0,
    css: 0,
    images: 0,
  };
  const isValid = (filename: string): boolean => {
    return !filename.startsWith("polyfills") && !filename.endsWith(".map");
  };
  const env = process.env.NODE_ENV;
  if (env !== "production") return null;

  // Javascript
  // Make each file an absolute path
  const jsFilePaths = (await fs.readdir(path.join(BUILD_PATH, "chunks")))
    // Remove "pages" so we don't double count
    .filter(f => f !== "pages")
    .map(f => path.join(BUILD_PATH, "chunks", f));
  // There are more JS files in the "pages" directory
  const jsPageFilePaths = (
    await fs.readdir(path.join(BUILD_PATH, "chunks", "pages"))
  ).map(f => path.join(BUILD_PATH, "chunks", "pages", f));
  // Get size of each valid file and increase the tracked size
  for (const filePath of [...jsFilePaths, ...jsPageFilePaths]) {
    if (!isValid(path.basename(filePath))) continue;
    const file = await fs.stat(filePath);

    sizesBytes.javascript += file.size;
  }

  // CSS
  const cssFilePaths = (await fs.readdir(path.join(BUILD_PATH, "css"))).map(f =>
    path.join(BUILD_PATH, "css", f)
  );
  for (const filePath of cssFilePaths) {
    if (!isValid(path.basename(filePath))) continue;
    const file = await fs.stat(filePath);
    sizesBytes.css += file.size;
  }

  // Images
  // Each image is stored in a directory
  const imageFileDirs = (await fs.readdir(path.join(CACHE_PATH, "images"))).map(
    f => path.join(CACHE_PATH, "images", f)
  );
  for (const dirPath of imageFileDirs) {
    const imagePaths = await fs.readdir(dirPath);
    for (const imagePath of imagePaths) {
      const file = await fs.stat(path.join(dirPath, imagePath));
      sizesBytes.images += file.size;
    }
  }*/

  const sizesBytes: { javascript: number; css: number; images: number } =
    JSON.parse(await fs.readFile(BUILD_SIZE_FILE, "utf-8"));

  return sizesBytes;
}
