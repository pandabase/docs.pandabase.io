import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Pandabase';
export const siteName = 'Pandabase Docs';
export const siteUrl = 'https://docs.pandabase.io';
export const siteDescription = 'Guides and API reference for Pandabase, the merchant of record platform for digital commerce.';
export const docsRoute = '/';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'pandabase',
  repo: 'docs.pandabase.io',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
