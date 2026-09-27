import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  PageLastUpdate,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl, gitConfig, siteName } from '@/lib/shared';
import { getPageDescription, getPageJsonLd } from '@/lib/seo';
import { socials } from '@/lib/layout.shared';
import { type GroupId, getGroup, getGroupOf } from '@/lib/navigation';
import { openapi } from '@/lib/openapi';
import { OpenAPIPage } from '@/components/api-page';

function getDocsPage(slug: string[], group: GroupId) {
  const page = source.getPage(slug);
  if (!page || getGroupOf(page.url).id !== group) notFound();
  return page;
}

async function DocsPageView({ slug, group }: { slug: string[]; group: GroupId }) {
  const page = getDocsPage(slug, group);

  const MDX = page.data.body;
  const { preloaded } = await openapi.preloadOpenAPIPage(page);
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageJsonLd(page)).replace(/</g, '\\u003c') }} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center justify-end border-b pb-4">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            OpenAPIPage: (props) => <OpenAPIPage {...props} preloaded={preloaded} />,
          })}
        />
      </DocsBody>
      <div className="flex items-center justify-between gap-4 border-t pt-4 text-sm text-fd-muted-foreground tabular-nums">
        {page.data.lastModified ? <PageLastUpdate date={page.data.lastModified} /> : <span />}
        <div className="flex items-center gap-1">
          {socials.map(({ label, url, Icon }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-md p-1.5 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </DocsPage>
  );
}

function getDocsMetadata(slug: string[], group: GroupId): Metadata {
  const page = getDocsPage(slug, group);
  const title = page.data.title;
  const description = getPageDescription(page);
  const image = { url: getPageImageUrl(page).url, width: 1200, height: 630, alt: title, type: 'image/png' };

  return {
    title,
    description,
    alternates: {
      canonical: page.url,
      types: { 'text/markdown': getPageMarkdownUrl(page).url },
    },
    openGraph: {
      type: 'article',
      url: page.url,
      title,
      description,
      siteName,
      locale: 'en_US',
      modifiedTime: page.data.lastModified?.toISOString(),
      images: [image],
    },
    twitter: { card: 'summary_large_image', site: '@pandabasehq', title, description, images: [image] },
  };
}

type RouteProps = { params: Promise<{ slug?: string[] }> };

/** page, static params and metadata for the route of a group, mounted at the group prefix */
export function createDocsRoute(group: GroupId) {
  const prefix = getGroup(group).prefix.split('/').filter(Boolean);
  const toSlug = async ({ params }: RouteProps) => [...prefix, ...((await params).slug ?? [])];

  return {
    Page: async (props: RouteProps) => <DocsPageView slug={await toSlug(props)} group={group} />,
    generateStaticParams: () =>
      source
        .getPages()
        .filter((page) => getGroupOf(page.url).id === group)
        .map((page) => ({ slug: page.slugs.slice(prefix.length) })),
    generateMetadata: async (props: RouteProps) => getDocsMetadata(await toSlug(props), group),
  };
}
