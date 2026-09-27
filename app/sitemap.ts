import type { MetadataRoute } from 'next';
import { getGroupOf, versions } from '@/lib/navigation';
import { siteUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => {
    const current = versions.find((version) => version.id === getGroupOf(page.url).version)?.current;
    return {
      url: `${siteUrl}${page.url}`,
      lastModified: page.data.lastModified,
      changeFrequency: 'weekly',
      priority: page.url === '/' ? 1 : current ? 0.7 : 0.4,
    };
  });
}
