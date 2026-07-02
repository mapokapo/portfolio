import type { ReactNode } from "react";

import { useEffect, useState } from "react";
import { SiAstro, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

import type { BuildSize } from "@/lib/schemas/buildSize";

import { humanFileSize } from "@/lib/utils";

export interface SiteInfoData {
  blogPosts: BlogPostSummary[];
  buildSize: "unavailable" | BuildSize;
  pageViews: SerializedPageView[];
}

interface BlogPostSummary {
  content: string;
  id: string;
  image: string;
  published: string;
  publishedRelative: string;
  readTimeMinutes: number;
  title: string;
}

interface SerializedPageView {
  recordStartTimestamp: string;
  totalViews: number;
}

interface SiteInfoProps {
  initialInfo: SiteInfoData;
}

export default function SiteInfo({ initialInfo }: SiteInfoProps) {
  const [info, setInfo] = useState(initialInfo);

  useEffect(() => {
    let aborted = false;

    const refresh = async () => {
      try {
        const response = await fetch("/api/site-info.json", {
          cache: "no-store",
        });
        if (!response.ok) {
          return;
        }
        const nextInfo = (await response.json()) as SiteInfoData;
        if (!aborted) {
          setInfo(nextInfo);
        }
      } catch {
        // Keep the prerendered data if the refresh endpoint is unavailable.
      }
    };

    const interval = window.setInterval(() => refresh, 60_000);
    void refresh();

    return () => {
      aborted = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      className="mt-24 flex scroll-mt-28 flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8 lg:mx-[7%]"
      id="website-info">
      <h2 className="text-4xl text-white sm:text-7xl">Website info</h2>
      <span className="px-3 text-center text-lg text-white/75 sm:text-xl">
        I&apos;ll be placing website updates and info here, for those interested
      </span>
      <div className="mt-4 grid w-full grid-flow-row grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:gap-8 lg:p-8">
        <BuildSizeCard buildSize={info.buildSize} />
        <BlogPostsCard posts={info.blogPosts} />
        <StatisticsCard entries={info.pageViews} />
        <BuiltWithCard />
      </div>
    </section>
  );
}

function BlogPostsCard({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <article className="col-span-1 row-span-3 flex h-full flex-col gap-8 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
      <h3 className="text-3xl sm:text-5xl md:mb-4 lg:mb-8">
        Latest devblog posts
      </h3>
      {posts.length === 0 ? (
        <span className="ml-2 text-base font-semibold sm:text-xl">
          Nothing here yet.
        </span>
      ) : (
        <ul className="mt-auto flex h-full max-h-75 flex-col gap-8 overflow-y-auto md:max-h-125 lg:max-h-150 xl:max-h-200">
          {posts.map(post => (
            <li key={post.id}>
              <a
                className="flex cursor-pointer flex-col items-center justify-center gap-2"
                href={`/blog/${post.id}`}>
                <div className="flex w-full gap-4">
                  <div className="relative hidden h-20 w-20 overflow-hidden lg:flex xl:h-24 xl:w-24">
                    <img
                      alt={`Devblog post titled ${post.title}`}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                      src={post.image}
                    />
                  </div>
                  <div className="flex flex-3 flex-col justify-center xl:flex-4">
                    <h4 className="text-2xl font-semibold break-normal xl:text-4xl">
                      {post.title}
                    </h4>
                    <span className="mt-1 ml-px text-xs opacity-50 sm:text-base">
                      Published {post.publishedRelative} •{" "}
                      {post.readTimeMinutes} minute read
                    </span>
                  </div>
                </div>
                <p className="line-clamp-3 w-full">
                  {post.content.replaceAll(/<[^>]+>/g, "").slice(0, 200)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function BuildSizeCard({
  buildSize,
}: {
  buildSize: "unavailable" | BuildSize;
}) {
  const rows =
    buildSize === "unavailable"
      ? [
          ["Javascript", "Unavailable"],
          ["CSS", "Unavailable"],
          ["Media", "Unavailable"],
          ["Total", "Unavailable"],
        ]
      : [
          ["Javascript", humanFileSize(buildSize.js)],
          ["CSS", humanFileSize(buildSize.css)],
          ["Media", humanFileSize(buildSize.media)],
          [
            "Total",
            humanFileSize(buildSize.js + buildSize.css + buildSize.media),
          ],
        ];

  return (
    <article className="col-span-1 row-span-1 flex flex-col gap-8 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
      <h3 className="text-3xl sm:text-5xl">Build size</h3>
      <div className="flex flex-col justify-center gap-3 text-2xl">
        {rows.map(([label, value], index) => (
          <div key={label}>
            {index > 0 ? (
              <hr className="mt-4 mb-2 h-px w-full opacity-50" />
            ) : null}
            <div className="flex items-center justify-between gap-4">
              <span
                className={
                  index === rows.length - 1
                    ? "text-2xl font-bold sm:text-4xl"
                    : "text-xl font-semibold"
                }>
                {label}
              </span>
              <span
                className={
                  index === rows.length - 1
                    ? "text-2xl font-bold sm:text-4xl"
                    : "text-xl"
                }>
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function BuiltWithCard() {
  return (
    <article className="col-span-1 flex h-min flex-col gap-x-4 gap-y-4 rounded-lg bg-slate-800 px-6 py-6 text-slate-700 sm:flex-row sm:flex-wrap md:col-span-2 md:px-8 lg:px-12 lg:py-8">
      <h3 className="text-center text-3xl text-white sm:text-start sm:text-5xl">
        Built with:
      </h3>
      <BuiltWithLink
        href="https://astro.build/"
        icon={
          <SiAstro
            color="#FF5D01"
            size={36}
          />
        }
        label="Astro"
      />
      <BuiltWithLink
        href="https://www.typescriptlang.org/"
        icon={
          <SiTypescript
            color="#3178C6"
            size={32}
          />
        }
        label="Typescript"
      />
      <BuiltWithLink
        href="https://react.dev/"
        icon={
          <SiReact
            color="#61DAFB"
            size={34}
          />
        }
        label="React"
      />
      <BuiltWithLink
        href="https://tailwindcss.com/"
        icon={
          <SiTailwindcss
            color="#06B6D4"
            size={36}
          />
        }
        label="Tailwind"
      />
    </article>
  );
}

function BuiltWithLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
      href={href}
      rel="noreferrer"
      target="_blank">
      {icon}
      <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
        {label}
      </span>
    </a>
  );
}

function formatHourLabel(timestamp: string) {
  return `${new Date(timestamp).getUTCHours().toString().padStart(2, "0")}:00`;
}

function getLabelIndices(
  entryCount: number,
  xStep: number,
  maxLabels = 6
): number[] {
  if (entryCount === 0) {
    return [];
  }

  if (entryCount === 1) {
    return [0];
  }

  const step = Math.max(1, Math.ceil(entryCount / maxLabels));
  const indices: number[] = [];

  for (let index = 0; index < entryCount; index += step) {
    indices.push(index);
  }

  const lastIndex = entryCount - 1;
  const previousLabel = indices.at(-1);

  if (previousLabel === undefined) {
    return indices;
  }

  const minIndexGap = Math.max(2, Math.ceil(36 / xStep));

  if (lastIndex !== previousLabel && lastIndex - previousLabel >= minIndexGap) {
    indices.push(lastIndex);
  }

  return indices;
}

function PageViewChart({ entries }: { entries: SerializedPageView[] }) {
  const width = 640;
  const height = 280;
  const paddingX = 42;
  const paddingY = 28;
  const values = entries.map(entry => entry.totalViews);
  const maxValue = Math.max(1, ...values);
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;
  const xStep = entries.length > 1 ? chartWidth / (entries.length - 1) : 0;
  const labelIndices = new Set(getLabelIndices(entries.length, xStep));
  const yTicks = 4;

  const points = entries
    .map((entry, index) => {
      const x = paddingX + index * xStep;
      const y = height - paddingY - (entry.totalViews / maxValue) * chartHeight;
      return `${x.toString()},${y.toString()}`;
    })
    .join(" ");

  const gridStroke = "rgba(255,255,255,0.1)";
  const axisStroke = "rgba(255,255,255,0.25)";

  return (
    <svg
      aria-label="Hourly website visits"
      className="h-auto w-full overflow-visible"
      role="img"
      viewBox={`0 0 ${width.toString()} ${height.toString()}`}>
      {Array.from({ length: yTicks + 1 }, (_, index) => {
        const y = paddingY + (chartHeight / yTicks) * index;
        return (
          <line
            key={`grid-y-${index.toString()}`}
            stroke={gridStroke}
            strokeDasharray="1.5 7"
            strokeLinecap="round"
            x1={paddingX}
            x2={width - paddingX}
            y1={y}
            y2={y}
          />
        );
      })}
      {entries.map((entry, index) =>
        labelIndices.has(index) ? (
          <line
            key={`grid-x-${entry.recordStartTimestamp}`}
            stroke={gridStroke}
            strokeDasharray="1.5 7"
            strokeLinecap="round"
            x1={paddingX + index * xStep}
            x2={paddingX + index * xStep}
            y1={paddingY}
            y2={height - paddingY}
          />
        ) : null
      )}
      <line
        stroke={axisStroke}
        x1={paddingX}
        x2={width - paddingX}
        y1={height - paddingY}
        y2={height - paddingY}
      />
      <line
        stroke={axisStroke}
        x1={paddingX}
        x2={paddingX}
        y1={paddingY}
        y2={height - paddingY}
      />
      <polyline
        fill="none"
        points={points}
        stroke="#ddd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      {entries.map((entry, index) =>
        labelIndices.has(index) ? (
          <text
            fill="#ddd"
            fontSize="14"
            key={entry.recordStartTimestamp}
            textAnchor="middle"
            x={paddingX + index * xStep}
            y={height - 4}>
            {formatHourLabel(entry.recordStartTimestamp)}
          </text>
        ) : null
      )}
      {Array.from({ length: yTicks + 1 }, (_, index) => {
        const value = Math.round(maxValue - (maxValue / yTicks) * index);
        const y = paddingY + (chartHeight / yTicks) * index;
        return (
          <text
            fill="#ddd"
            fontSize="14"
            key={`y-label-${index.toString()}`}
            textAnchor="end"
            x={paddingX - 8}
            y={y + 4}>
            {value}
          </text>
        );
      })}
    </svg>
  );
}

function StatisticsCard({ entries }: { entries: SerializedPageView[] }) {
  return (
    <article className="col-span-1 row-span-2 flex flex-col justify-evenly gap-4 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
      <h3 className="text-3xl sm:text-5xl">Statistics</h3>
      <span className="mb-auto text-lg text-white/70 sm:text-xl">
        Hourly website visits
      </span>
      <PageViewChart entries={entries} />
    </article>
  );
}
