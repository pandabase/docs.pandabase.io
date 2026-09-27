import type { ReactNode } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import { Blocks, Code, Store } from 'lucide-react';
import { source } from './source';

export type VersionId = 'v1' | 'v2';
export type GroupId = 'v1-merchants' | 'v1-developers' | 'v2-merchants' | 'v2-developers' | 'v2-platforms';

interface Group {
  id: GroupId;
  version: VersionId;
  title: string;
  icon: ReactNode;
  /** url prefix of the group, pages belong to the group with the longest matching prefix */
  prefix: string;
  tabTitles?: Record<string, string>;
}

export const versions: { id: VersionId; title: string; current?: boolean }[] = [
  { id: 'v1', title: 'V1', current: true },
  { id: 'v2', title: 'V2' },
];

export const groups: Group[] = [
  { id: 'v1-merchants', version: 'v1', title: 'For Merchants', icon: <Store />, prefix: '/' },
  {
    id: 'v1-developers',
    version: 'v1',
    title: 'For Developers',
    icon: <Code />,
    prefix: '/developers',
    tabTitles: { Developers: 'Documentation' },
  },
  { id: 'v2-merchants', version: 'v2', title: 'For Merchants', icon: <Store />, prefix: '/v2' },
  {
    id: 'v2-developers',
    version: 'v2',
    title: 'For Developers',
    icon: <Code />,
    prefix: '/v2/developers',
    tabTitles: { Developers: 'Documentation' },
  },
  { id: 'v2-platforms', version: 'v2', title: 'For Platforms', icon: <Blocks />, prefix: '/v2/platforms' },
];

export function getGroup(id: GroupId) {
  return groups.find((group) => group.id === id)!;
}

function matches(url: string, prefix: string) {
  return prefix === '/' || url === prefix || url.startsWith(`${prefix}/`);
}

export function getGroupOf(url: string) {
  return groups.filter((group) => matches(url, group.prefix)).sort((a, b) => b.prefix.length - a.prefix.length)[0];
}

function collectUrls(folder: PageTree.Folder | PageTree.Root, includeRoots = false, urls: string[] = []) {
  if ('index' in folder && folder.index) urls.push(folder.index.url);
  for (const node of folder.children) {
    if (node.type === 'page') urls.push(node.url);
    // nested root folders get their own tab
    else if (node.type === 'folder' && (includeRoots || !node.root)) collectUrls(node, includeRoots, urls);
  }
  // unlisted pages go last so they never become a tab's landing page
  if ('fallback' in folder && folder.fallback) collectUrls(folder.fallback, includeRoots, urls);
  return urls;
}

function filterNodes(nodes: PageTree.Node[], id: GroupId): PageTree.Node[] {
  return nodes.flatMap((node) => {
    if (node.type === 'separator') return [];
    if (node.type === 'page') return getGroupOf(node.url).id === id ? [node] : [];

    const owners = new Set(collectUrls(node, true).map((url) => getGroupOf(url).id));
    if (!owners.has(id)) return [];
    if (owners.size === 1) return [node];
    // folder shared by several groups (e.g. v2/), keep only this group's part
    return filterNodes(node.index ? [node.index, ...node.children] : node.children, id);
  });
}

// nested root folders (e.g. developers/api) become top-level so their parent's sidebar doesn't list them
function hoistRoots(nodes: PageTree.Node[], hoisted: PageTree.Node[] = [], nested = false): PageTree.Node[] {
  const kept = nodes.flatMap((node): PageTree.Node[] => {
    if (node.type !== 'folder') return [node];
    const folder = { ...node, children: hoistRoots(node.children, hoisted, true) };
    if (nested && folder.root) {
      hoisted.push(folder);
      return [];
    }
    return [folder];
  });
  return nested ? kept : [...kept, ...hoisted];
}

function filterTree(root: PageTree.Root, id: GroupId): PageTree.Root {
  // pages left out of meta.json live in the fallback tree
  return {
    ...root,
    children: hoistRoots(filterNodes(root.children, id)),
    fallback: root.fallback && filterTree(root.fallback, id),
  };
}

export function getGroupTree(id: GroupId): PageTree.Root {
  return filterTree(source.getPageTree(), id);
}

function toTab(title: string, icon: ReactNode, urls: string[]): LayoutTab {
  return { title, icon, url: urls[0] ?? '/', urls: new Set(urls) };
}

export function getGroupTabs(version: VersionId) {
  return groups
    .filter((group) => group.version === version)
    .map((group) => toTab(group.title, group.icon, collectUrls(getGroupTree(group.id), true)));
}

export function getVersionOptions() {
  return versions.map((version) => {
    const first = groups.find((group) => group.version === version.id);
    const url = first ? (collectUrls(getGroupTree(first.id), true)[0] ?? '/') : '/';
    return { id: version.id, title: version.title, url, current: version.current };
  });
}

export function transformTab(id: GroupId) {
  const titles = getGroup(id).tabTitles ?? {};

  return (tab: LayoutTab, folder: PageTree.Folder): LayoutTab => {
    const urls = collectUrls(folder);
    const title = typeof folder.name === 'string' ? (titles[folder.name] ?? tab.title) : tab.title;
    return { ...tab, title, url: urls[0] ?? tab.url, unlisted: false, $folder: undefined, urls: new Set(urls) };
  };
}
