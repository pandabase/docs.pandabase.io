import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import type { InferPageType } from 'fumadocs-core/source';
import { getGroupOf, getGroupTree, versions } from './navigation';
import { siteName, siteUrl } from './shared';
import type { source } from './source';

type DocsPage = InferPageType<typeof source>;

export function getPageContext(page: DocsPage) {
  const group = getGroupOf(page.url);
  const version = versions.find((item) => item.id === group.version)!;
  const breadcrumbs = getBreadcrumbItems(page.url, getGroupTree(group.id), { includePage: false })
    .map((item) => item.name)
    .filter((name): name is string => typeof name === 'string');
  const method = getOpenAPIMeta(page)?.method?.toLowerCase();

  return { group, version, breadcrumbs, method };
}

function getOpenAPIMeta(page: DocsPage) {
  return page.data._openapi as { method?: string; structuredData?: { contents?: { content: string }[] } } | undefined;
}

export function getPageDescription(page: DocsPage) {
  // generated api pages keep the operation description in their openapi metadata
  const description = page.data.description ?? getOpenAPIMeta(page)?.structuredData?.contents?.[0]?.content;
  if (description) return description.replace(/`/g, '');
  const { group, breadcrumbs } = getPageContext(page);
  return `${page.data.title} — ${[group.title.replace(/^For /, ''), ...breadcrumbs].join(' / ')} in the Pandabase documentation.`;
}

export function getPageJsonLd(page: DocsPage) {
  const { breadcrumbs } = getPageContext(page);
  const url = `${siteUrl}${page.url}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: page.data.title,
        description: getPageDescription(page),
        url,
        dateModified: page.data.lastModified?.toISOString(),
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
        publisher: { '@type': 'Organization', name: 'Pandabase', url: 'https://pandabase.io', logo: `${siteUrl}/logo.png` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [...breadcrumbs, page.data.title].map((name, i, all) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          ...(i === all.length - 1 && { item: url }),
        })),
      },
    ],
  };
}
