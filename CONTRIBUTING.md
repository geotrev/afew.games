# Contributing to A Few Games

Interested in contributing to A Few Games? There are a few ways to do so and this document runs down the basics of workflow & application structure.

Please note that this project has a [code of conduct](CODE_OF_CONDUCT.md) that is required of all participants (maintainer(s) included). All contributions will be licensed under the [MIT License](https://mit-license.org/).

As mentioned in the [README](README.md), filing an issue is a great start if you just want to put something in front of maintainers or ask questions before starting a pull request (PR).

- [Overview](#overview)
- [Development Workflow](#development-workflow)
- [Pull Request Workflow](#pull-request-workflow)
- [Application](#application)
  - [Blog Posts](#blog-posts)
  - [Blog Index](#blog-index)
  - [Game Data](#game-data)

## Overview

A Few Games is a website with Tina CMS integration.

Core tech stack includes:

- `next` as the backbone of the app
  - By extension, the app uses `react` for UI.
- `tailwindcss` and `daisyui` for styles
- `tinacms` to manage content, both static and dynamic
- `husky` & `lint-staged` (commit linting & pre-commit hooks)
- `eslint` and `prettier` (style and formatting)

Tina CMS has many benefits in the architecture and multiple static content blocks use it (home & about page, contribute/submission form).

When using Tina, the queries must happen server-side to benefit with caching at runtime. Never use a client query on a client component, as it will cause massive delay for contentful paint.

## Development Workflow

Basic scripts are used to run the app, all thanks to Next JS.

- `dev` - local development
- `build` - build the app for production, locally
- `start` - to run the production app after running `build`
- `lint` - lints the app for JS, CSS and `tailwind`/`daisyui` styles class name order

Finally, all commits run through `husky` and `lint-staged` for formatting. Errors must be fixed before re-committing.

## Pull Request Workflow

1. Fork the repo and create a branch from `main`.
2. Commits are expected to follow a [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) pattern.
3. Concise & regular commits help with code review and are encouraged.
4. Open the pull request with a brief explanation of the issue & its proposed fix.
5. All PRs need to pass CI checks before merging.
6. A maintainer will merge the PR when if it is approved & ready.

## Application

### Blog posts

All blog posts are managed via Tina CMS. They can be written in the CMS, or locally via markdown. Using the CMS provides a more user-friendly experience, at the expense of not having a draft feature (yet, but maybe one day it will be free!).

For drafts, create a local branch and use markdown, then create a PR

Since essays are managed via Tina, that means their content and the index page are provided at request time, but cached using Netlify CDN.

### Blog Index

Blogs are accessed via their index page, which has cursor pagination.

The initial list of essays is always server rendered. When paginating, Tina client is queried, which can take a second or two (depending on internet connection) to resolve. While not ideal, this is their recommended method of paginating in the browser.

Recent posts are flagged with a "new" badge if they were published in the last 30 days.

### Game Data

While the database is similar to the blog and its content is leveraging Tina CMS, it is entirely composed of JSON, and is queried using an edge function (rather than a Tina query).

The primary reason to manage the "database" this way is to keep it open and referencable by everyone, not just on the website. In the future, it will most likely migrate to a proper database via SQL. For now, it's an MVP that works and the queries are fast.

Since the data is API-driven, it has no initial load state unless the page loads with url params. In this case, the edge function is called immediately.
