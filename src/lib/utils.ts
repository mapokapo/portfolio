export function getReadTimeMinutes(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getRelativeTime(d1: Date, d2 = new Date()) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: Record<string, number> = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    second: 1000,
    year: 24 * 60 * 60 * 1000 * 365,
  };
  const elapsed = d1.getTime() - d2.getTime();

  for (const unit in units) {
    if (Math.abs(elapsed) > units[unit] || unit === "second") {
      return rtf.format(
        Math.round(elapsed / units[unit]),
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "";
}

export function humanFileSize(bytes: number) {
  const index = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(2)).toString()} ${
    ["B", "kB", "MB", "GB", "TB"][index]
  }`;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
