---
publish_date: 2024-04-27
title: New search is live
description: Database search now uses API-backed search feature for better performance
---
Howdy all! It has been somewhat quiet on the blog for a few months. I wanted to share some great news about the website's database feature so there's hopefully less confusion when you interact with it.

**TL;DR:** The search feature is no longer a keyword filter, but now runs a query of the games and returns the results.

To start, let's cover what A Few Games' search looked like before. Previously, you could view all of the website's games on a single page. Every variant and console would be provided by default, the search would act more as a keyword filter, which paired well with the platform selection just below it.

So what changed? Now, the data isn't immediately provided to reduce initial page load. Also, the performing a keyword search hits a new API which searches the database and returns the exact results. You can still filter by platform from there.

To be extra precise, there isn't actually a "database" here. If you've looked at the source code, it's actually just a series of JSON files split by console/platform.

If you run into any issues, don't hesitate to reach out to me directly and I'll help clarify! Or better, if you see a bug, I can address it ASAP.

Thanks for reading and happy collecting!