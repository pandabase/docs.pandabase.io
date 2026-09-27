import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getPageContext, getPageDescription } from '@/lib/seo';
import { getPageImageUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export const revalidate = false;

const colors = {
  background: '#0a0f0c',
  foreground: '#ffffff',
  muted: '#9aa4a0',
  accent: '#2bd576',
};

const methodColors: Record<string, string> = {
  get: '#38bdf8',
  post: '#2bd576',
  put: '#f59e0b',
  patch: '#f59e0b',
  delete: '#f87171',
};

const geist = join(process.cwd(), 'node_modules/geist/dist/fonts');

// satori can't read woff2, so load the ttf builds shipped with the geist package
const assets = Promise.all([
  readFile(join(geist, 'geist-sans/Geist-Regular.ttf')),
  readFile(join(geist, 'geist-sans/Geist-SemiBold.ttf')),
  readFile(join(geist, 'geist-mono/GeistMono-Medium.ttf')),
  readFile(join(process.cwd(), 'public/logo.png')),
]);

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const [regular, semibold, mono, logo] = await assets;
  const { group, version, breadcrumbs, method } = getPageContext(page);
  const trail = [group.title.replace(/^For /, ''), ...breadcrumbs].join('  /  ');
  const title = page.data.title;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '64px 72px',
          color: colors.foreground,
          backgroundColor: colors.background,
          backgroundImage: `radial-gradient(circle at 100% 0%, ${colors.accent}33 0%, transparent 45%)`,
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={`data:image/png;base64,${logo.toString('base64')}`} height={52} width={209} alt="" />
          <div
            style={{
              display: 'flex',
              fontFamily: 'Geist Mono',
              fontSize: 22,
              color: colors.accent,
              border: `2px solid ${colors.accent}55`,
              borderRadius: 10,
              padding: '6px 14px',
            }}
          >
            {version.id.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Geist Mono',
              fontSize: 24,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: colors.accent,
            }}
          >
            {truncate(trail, 60)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 20 }}>
            {method && (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Geist Mono',
                  fontSize: 32,
                  color: methodColors[method] ?? colors.foreground,
                  border: `2px solid ${methodColors[method] ?? colors.foreground}`,
                  borderRadius: 12,
                  padding: '4px 16px',
                }}
              >
                {method.toUpperCase()}
              </div>
            )}
            <div style={{ display: 'flex', fontSize: title.length > 32 ? 64 : 80, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
              {truncate(title, 70)}
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 32, lineHeight: 1.4, color: colors.muted, maxWidth: 1040 }}>
            {truncate(getPageDescription(page), 120)}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: regular, weight: 400 },
        { name: 'Geist', data: semibold, weight: 600 },
        { name: 'Geist Mono', data: mono, weight: 500 },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
