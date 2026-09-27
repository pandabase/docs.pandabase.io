import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { baseOptions } from '@/lib/layout.shared';
import { type GroupId, getGroup, getGroupTabs, getGroupTree, getVersionOptions, transformTab } from '@/lib/navigation';
import { SidebarFooter } from './sidebar-footer';
import { VersionSwitcher } from './version-switcher';

export function GroupLayout({ group, children }: { group: GroupId; children: ReactNode }) {
  const base = baseOptions();
  const { version } = getGroup(group);

  return (
    <DocsLayout
      tree={getGroupTree(group)}
      {...base}
      nav={{
        ...base.nav,
        mode: 'top',
        // the sticky header positions this at the tab row's right end
        children: (
          <div key="version-switcher" className="ms-3 flex items-center lg:absolute lg:end-6 lg:bottom-0 lg:h-9">
            <VersionSwitcher options={getVersionOptions()} active={version} />
          </div>
        ),
      }}
      tabMode="navbar"
      tabs={{ transform: transformTab(group) }}
      sidebar={{
        banner: <SidebarTabsDropdown key="groups" options={getGroupTabs(version)} className="-order-1" />,
        footer: SidebarFooter,
      }}
    >
      {children}
    </DocsLayout>
  );
}
