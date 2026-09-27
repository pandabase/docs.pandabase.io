'use client';

import { Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';

export type VersionOption = { id: string; title: string; url: string; current?: boolean };

function CurrentBadge() {
  return <span className="rounded-md bg-fd-primary/10 px-1.5 py-0.5 font-mono text-[0.625rem] font-medium tracking-wider text-fd-primary uppercase">Current</span>;
}

export function VersionSwitcher({ options, active }: { options: VersionOption[]; active: string }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.id === active) ?? options[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[popup-open]:text-fd-accent-foreground">
        {selected.title}
        {selected.current && <CurrentBadge />}
        <ChevronDown className="size-3.5 transition-transform in-data-[popup-open]:rotate-180" />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex min-w-48 flex-col gap-0.5 p-1">
        {options.map((option) => (
          <Link
            key={option.id}
            href={option.url}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-sm hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            {option.title}
            {option.current && <CurrentBadge />}
            <Check className={option.id === selected.id ? 'ms-auto size-3.5 text-fd-primary' : 'invisible ms-auto size-3.5'} />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
