# docs.pandabase.io

Pandabase documentation for merchants and developers.

## Local development

Use Node.js 24 or newer and pnpm. Node.js runs the TypeScript OpenAPI generator directly.

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000) to view the site.

## Commands

| Command                 | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `pnpm dev`              | Start the development server.                                         |
| `pnpm build`            | Build the production site.                                            |
| `pnpm start`            | Serve the production build.                                           |
| `pnpm lint`             | Run Oxlint.                                                           |
| `pnpm types:check`      | Generate Next.js route types and check TypeScript.                    |
| `pnpm generate:openapi` | Regenerate API reference pages from the local OpenAPI specifications. |

## Project structure

```text
app/          Page layouts, routes, search, and LLM endpoints
components/   Shared documentation, API, and Mermaid components
content/docs/ MDX pages and navigation metadata, including v2 content
lib/          Content loading, navigation, and OpenAPI configuration
openapi/      Store, Storefront, and Billing API specifications
public/       Static assets
scripts/      OpenAPI generation script
```

## Writing documentation

Add or edit `.mdx` files in `content/docs/`. Pages use frontmatter for their title and description:

```mdx
---
title: Your page title
description: A short description of the page.
---

Write your documentation here.
```

Set navigation order and groups in the folder's `meta.json`. Shared MDX components live in `components/mdx.tsx`; content loading is defined in `lib/source.ts`.

Preview changes with `pnpm dev`, then run `pnpm lint`, `pnpm types:check`, and `pnpm build` before submitting changes.

## Updating API references

Edit the relevant specification in `openapi/store.json`, `openapi/storefront.json`, or `openapi/billing.json`, then run:

```sh
pnpm generate:openapi
```

The generator replaces the `store-api-reference`, `storefront-api-reference`, and `billing-api-reference` folders under `content/docs/developers/api/`. Edit the specifications to update these pages. Set specification paths and output names in `lib/openapi.ts`.

Review the regenerated pages alongside the specification changes and verify the site builds.

## License

Licensed under the [MIT License](LICENSE).
