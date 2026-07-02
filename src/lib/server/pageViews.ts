import { redis } from "@/lib/server/redis";

const HOUR_MS = 60 * 60 * 1000;
const MAX_AGE_MS = 14 * 24 * HOUR_MS;
const CHART_HOURS = 24;
const KEY = "pageViews";

export interface PageView {
  recordStartTimestamp: Date;
  totalViews: number;
}

interface StoredEntry { recordStartTimestamp: string; totalViews: number }

export async function getPageViews(): Promise<PageView[]> {
  const entries = await load();
  return entries.length > 0 ? entries : emptyChart();
}

export async function recordPageView() {
  const entries = await load();
  const latest = entries.at(-1);
  const now = Date.now();

  if (!latest || now - latest.recordStartTimestamp.getTime() > HOUR_MS) {
    const bucketStart = latest
      ? latest.recordStartTimestamp.getTime() +
        Math.floor((now - latest.recordStartTimestamp.getTime()) / HOUR_MS) *
          HOUR_MS
      : now - (now % HOUR_MS);

    entries.push({
      recordStartTimestamp: new Date(bucketStart),
      totalViews: 1,
    });
  } else {
    latest.totalViews += 1;
  }

  await save(entries);
}

function emptyChart(): PageView[] {
  const aligned = Date.now() - (Date.now() % HOUR_MS);

  return Array.from({ length: CHART_HOURS }, (_, index) => ({
    recordStartTimestamp: new Date(
      aligned - (CHART_HOURS - 1 - index) * HOUR_MS
    ),
    totalViews: 0,
  }));
}

async function load(): Promise<PageView[]> {
  const client = redis();
  if (!client) {
    return [];
  }

  const raw = await client.get<StoredEntry[]>(KEY);
  if (!raw?.length) {
    return [];
  }

  const cutoff = Date.now() - MAX_AGE_MS;

  return raw
    .map(entry => ({
      recordStartTimestamp: new Date(entry.recordStartTimestamp),
      totalViews: entry.totalViews,
    }))
    .filter(entry => entry.recordStartTimestamp.getTime() >= cutoff)
    .sort(
      (a, b) =>
        a.recordStartTimestamp.getTime() - b.recordStartTimestamp.getTime()
    );
}

async function save(entries: PageView[]) {
  const client = redis();
  if (!client) {
    return;
  }

  await client.set(
    KEY,
    entries.map(entry => ({
      recordStartTimestamp: entry.recordStartTimestamp.toISOString(),
      totalViews: entry.totalViews,
    }))
  );
}
