# Contributing to A Few Games

Interested in contributing to A Few Games? There are a few ways to do so and this document runs down the basics of workflow & application structure.

Please note that this project has a [code of conduct](CODE_OF_CONDUCT.md) that is required of all participants (maintainer(s) included). All contributions will be licensed under the [MIT License](https://mit-license.org/).

As mentioned in the [README](README.md), filing an issue is a great start if you just want to put something in front of maintainers or ask questions before starting a pull request (PR).

- Overview
- Development Workflow
- Pull Request Workflow
- Application
  - Blog Posts
  - Blog Index
  - Databases

## Overview

A Few Games is a website with Netlify CMS integration (`public/admin/index.html`). It is written in TypeScript and views are in React. The CMS uses [Netlify Identity](https://docs.netlify.com/security/secure-access-to-sites/identity/) for authentication.

Core tech stack includes:

- `next` as the backbone of the app
- `tailwindcss` and `daisyui` for styles
- Netlify CMS, soon to be Decap CMS (manages blog posts & database content)
- `husky` & `lint-staged` (commit linting & pre-commit hooks)
- `eslint` and `prettier` (style and formatting)

Of worthy note, the version of Netlify CMS on A Few Games is a [fork](https://github.com/geotrev/netlify-cms/tree/3415-list-lag-example) I created once Netlify had perceivably abandoned the project (hadn't been updated for about six months). This fork contains a critical performance improvement on [text](https://decapcms.org/docs/widgets/#text) widgets that is necessary for Collections required this project. You can read more about the bug fix question [here](https://github.com/decaporg/decap-cms/pull/6565), as it will be made available in Decap in the Near Future™.

## Development Workflow

Basic scripts are used to run the app, all thanks to Next JS.

- `dev` - local development
- `build` - build the app for production, locally
- `start` - to run the production app after running `build`
- `lint` - lints the app for JS, CSS and `tailwind`/`daisyui` styles class name order
- `seed` - clears & rebuilds local blog post examples for development

Finally, all commits run through `husky` and `lint-staged` for formatting. Errors must be fixed before re-committing.

## Pull Request Workflow

1. Fork the repo and create a branch from `main`.
2. Commits are expected to follow a [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) pattern.
3. Concise & regular commits help with code review and are encouraged.
4. Open the pull request with a brief explanation of the issue & its proposed fix.
5. All PRs need to pass CI checks before merging.
6. A maintainer will merge the PR when if it is approved & ready.

## Application

### Blog posts (`essays/[slug]`)

All blog posts are managed via Netlify CMS. They can be written in the CMS, or locally via markdown. Using the CMS provides an automated pull request & review cycle that's proved useful, historically.

Posts are processed by the application via two packages:

- `gray-matter` (markdown & metadata extraction)
- `marked` (HTML conversion)

Posts are processed on the server by Next JS at request time before serving to the client. The data is so small that often caching isn't critical to a speedy load time

### Blog Index (`/essays`)

Blogs can be browsed by title, description, and publish data on this page.

The index page uses basic pagination with URL search parameters. The initial page is always server rendered, including if search params are given. Any other pages are API-driven at run time (`app/api/essays`) as the user changes page.

Recent posts are flagged with a "new" badge if they were published in the last 30 days.

### Databases

While the database is similar to the blog, it is powered via the CMS [Collection](https://decapcms.org/docs/collection-types/#file-collections) composed of JSON, using the repository commit history for versioning.

All collection schemas are defined at `public/admin/config.yml`.

The primary reason to manage the "database" this way is to keep it open and referencable by everyone, not just on the website. In the future, it will most flikely be necessary to migrate to a proper database via SQL in the future, but for now, it's an MVP that works.

Unlike blog posts, the database isn't API-driven (but is [planned](https://github.com/geotrev/afew.games/issues/274)). It may over time be split up into separate Collection files, but for now, for better or worse, it's one giant JSON blob.
