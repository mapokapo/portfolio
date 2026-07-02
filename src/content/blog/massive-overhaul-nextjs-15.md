---
title: "A Massive Overhaul: Next.js 15 and Beyond"
published: 2025-09-22
description:
  "A long-overdue update: Next.js 15, Tailwind v4, ESLint flat config, a /lore
  page, blog redesign, and Zod-backed Firestore schemas - all in one giant
  commit."
---

## The Big Refactor

No, I've not abandoned this website 😀

I've just pushed a massive update to the project. It's been a while since I last
wrote about it, so here's a quick summary of what changed and why.

This update deserves its own chapter. The commit message, which might be the
longest commit message I've ever written, says it all (and then some):

```
feat,refactor: update project to Next.js 15, update all dependencies,
migrate ESLint to flat config, migrate Tailwind to v4,
use consistent kebab-case naming for components, migrate to app router,
use more idiomatic static data retrieval techniques, edit the text data,
improve website metadata, reword website, turn section panels into a separate "/lore" page,
fix styles, update showcase cards to be wider, include project text,
and have the tech list wrap, update blog post list to include all posts,
completely redesign blog page, implement HTML prose rendering for blog posts,
implement "recommended posts" section in blog post view, add back button to blog page,
update page view logic, utilize "server-only" rule package in server lib files,
use zod-based schemas for Firestore de/serialization, remove unused files and functions
```

Yes, that's one commit... Maybe I should've broken it into ten smaller commits,
but oh well.

Also, yes, I will try to use properly formatted commit messages from now on
(commit type, scope, message).

### What changed

- **Next.js 15** with the app router.
- **Tailwind v4** - not because v3 was broken, just keeping things current.
- **ESLint flat config** - this was the last project of mine still on the legacy
  setup.
- **Kebab-case component names** - I got used to shadcn/ui conventions and
  wanted consistency.
- A `/lore` page for the old about-me section panels, so visitors aren't forced
  to read my life story before reaching the project showcase.
- A full **blog redesign**: proper prose rendering, recommended posts, and a
  back button.
- **Zod schemas for Firestore** - the schema will probably change and I'd rather
  catch breakage at runtime than debug it later.

### Why bother?

Mostly maintainability. The old structure had accumulated enough cruft that
adding anything new felt like working around the codebase rather than with it.
Now it's cleaner, the blog is actually readable, and future changes should be a
lot less painful.
