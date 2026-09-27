'use client';

import type { ComponentProps } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sidebarLinks } from '@/lib/layout.shared';

// replaces the notebook footer wrapper, which is hidden on desktop
export function SidebarFooter({ children }: ComponentProps<'div'>) {
  return (
    <div className="flex flex-col gap-0.5 border-t p-2">
      {sidebarLinks.map(({ text, url }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg px-2 py-1 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          {text}
          <ArrowUpRight className="size-3.5" />
        </a>
      ))}
      <div className="flex items-center justify-end empty:hidden">{children}</div>
    </div>
  );
}
