import { createDocsRoute } from '@/components/docs-page';

const route = createDocsRoute('v2-merchants');

export default route.Page;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
