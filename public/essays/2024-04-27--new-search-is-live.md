---
publish_date: 2024-04-27
title: Database changes now live
description: Small changes to improve performance and longevity
---
Howdy all! It has been somewhat quiet on the blog for a few months. I wanted to share some great news about the website's database feature so there's hopefully less confusion when you interact with it.

**TL;DR:** The database no longer loads all games by default. Instead, run a search to find games.

To start, let's cover what A Few Games' search looked like before.

Previously, you could view all of the website's games on the home page. All you had to do was add a key word to the search field and select platforms to narrow down the filter.

So what changed? Now, the data isn't immediately provided for a few reasons (see next paragraph). Instead, input a search and the results will populate accordingly. You can still filter by platform however.

Why are we changing it? This is a two part answer.

The first is that this improves the page load speed, as the game data takes up a chunk of bandwidth and can cause a delay.

The second is that this sets the stage for the database eventually moving into a proper data model via SQL or another database tool. While this isn't happening right now, it will provide the most stability long term. When this migration happens, the data will still be hosted separately as JSON, although it won't be in the website's repository anymore. Instead that JSON will be hosted in a public repository as a mirror to the database. 

To be extra precise, there isn't actually a "database" here. If you've looked at the source code, it's actually just a series of JSON files split by console/platform.

If you run into any issues, don't hesitate to reach out to me directly and I'll help clarify! Or better, if you see a bug, I can address it ASAP.

Thanks for reading and happy collecting!