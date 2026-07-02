---
title: "Migration to Firebase"
published: 2022-09-23
description:
  "Vercel deployment taught me you can't store mutable data on the platform - so
  I wired up Firebase for persistence and got the site live."
---

Deploying the project to **Vercel** didn't go as smoothly as I expected. It
turns out you can't store any kind of _mutable data_ directly on Vercel - you
need to rely on a third-party cloud storage service.

I decided to go with **Firebase**, since I'm most familiar with it, though it's
still far from a perfect solution. For now, the website remains pretty much the
same as before, but at least it's up and running.
