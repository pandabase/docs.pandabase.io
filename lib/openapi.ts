import { createOpenAPI } from 'fumadocs-openapi/server';

export const specs = {
  store: { file: './openapi/store.json', output: 'store-api-reference', title: 'Store APIs' },
  storefront: { file: './openapi/storefront.json', output: 'storefront-api-reference', title: 'Storefront APIs' },
  billing: { file: './openapi/billing.json', output: 'billing-api-reference', title: 'Billing APIs' },
};

export const openapi = createOpenAPI({
  input: Object.fromEntries(Object.entries(specs).map(([id, spec]) => [id, spec.file])),
});
