import { type BuildSize, buildSizeSchema } from "@/lib/schemas/buildSize";
import { redis } from "@/lib/server/redis";

const KEY = "buildSize";

export async function getBuildSize(): Promise<"unavailable" | BuildSize> {
  const client = redis();
  if (!client) {
    return "unavailable";
  }

  const parsed = buildSizeSchema.safeParse(await client.get(KEY));
  return parsed.success ? parsed.data : "unavailable";
}
