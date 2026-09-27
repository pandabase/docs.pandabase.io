import type { ReactNode } from 'react';
import { GroupLayout } from '@/components/group-layout';

export default function Layout({ children }: { children: ReactNode }) {
  return <GroupLayout group="v1-developers">{children}</GroupLayout>;
}
