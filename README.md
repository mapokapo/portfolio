# The public GitHub repository for my personal portfolio website.

Made using Astro, Tailwind, and TypeScript.

## Run instructions

`bun run dev` for development.

`bun run build` followed by `bun run preview` for the optimized production
build.

## Deployment

Set the Vercel project root to `portfolio`. The project uses Astro's Vercel
adapter so pre-rendered pages stay static while `/api/pageView` and
`/api/site-info.json` run server-side.

Page views and build size are stored in Upstash Redis (via the Vercel Marketplace
integration). Set `KV_REST_API_URL` and `KV_REST_API_TOKEN` in your environment.
Build size is uploaded after each `bun run build` by the `postbuild` script.

## Blog posts

1. Add `src/content/blog/{slug}.md` with `title`, `description`, and `published`
   frontmatter.
2. Add `src/assets/blog/{slug}.webp` (WebP, max ~1200px wide).
3. Register the import in `src/assets/blog/index.ts`.

The slug must match across all three. Astro optimizes images at build time.

## Assets

- `public/` - favicon, PWA manifest, and `icons/` only.
- `src/assets/blog/` - blog cover images (see above).
- `src/assets/showcase/` - project tile logos; set `imageKey` in `data.json` and
  register in `index.ts`.
- `src/assets/meta/` - default OG/social preview image.
