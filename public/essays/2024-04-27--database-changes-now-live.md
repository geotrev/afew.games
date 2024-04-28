---
publish_date: 2024-04-28
title: Database Changes Now Live
description: Announcing some small changes to improve performance and prepare for longevity
---
Howdy all! It has been somewhat quiet on the blog for a few months. I want to share some great news about the website's search feature!

**TL;DR:** The database no longer loads all games by default. Instead, a search is required to view game data.

## The old search

Previously, you could view all of the website's games on the home page by default. As soon as the page loaded, it would be visible. All you had to do was provide key words to the search field and select platforms to narrow down the filter.

So what changed? Now, the data isn't immediately provided. Instead, input a search and the results will populate based on matches. You can still filter by platform after a search to narrow the displayed games.

## Why was the search changed?

This is a two part answer.

The first is that this improves the page load speed, as the game data takes up a sizable chunk of bandwidth and can cause load delays.

The second is that this sets the stage for the database eventually moving into a \*real database\** (e.g., SQL or another tool). While this isn't happening right now, it will provide the most stability long term. When this migration happens, the data will still be hosted separately as JSON, although it won't be in the website's repository anymore. Instead that JSON will be hosted in a public repository as a mirror to the database.

*\*To be extra precise, there isn't actually a "database" here. If you've looked at the source code, it's actually just a series of JSON files split by console/platform.*

- - -

If you run into any issues, don't hesitate to reach out to me directly and I'll help clarify! Or better, if you see a bug, I can address it ASAP.

Thanks for reading and happy collecting!