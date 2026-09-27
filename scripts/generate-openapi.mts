import { readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { specs } from '../lib/openapi.ts';

const apiDir = './content/docs/developers/api';

for (const [id, spec] of Object.entries(specs)) {
  const output = join(apiDir, spec.output);
  const { paths } = JSON.parse(await readFile(spec.file, 'utf8'));
  await rm(output, { recursive: true, force: true });

  await generateFiles({
    input: createOpenAPI({ input: { [id]: spec.file } }),
    output,
    per: 'operation',
    groupBy: 'tag',
    includeDescription: true,
    meta: true,
    name(entry) {
      if (entry.type !== 'operation') return entry.info.title.toLowerCase().replace(/\W+/g, '-');
      const { path, method } = entry.item;
      const operationId: string | undefined = paths[path][method].operationId;
      return operationId?.toLowerCase() ?? [method, ...path.split('/')].map((part) => part.replace(/[{}]/g, '').toLowerCase()).filter(Boolean).join('-');
    },
  });

  const metaPath = join(output, 'meta.json');
  const meta = JSON.parse(await readFile(metaPath, 'utf8'));
  await writeFile(metaPath, `${JSON.stringify({ ...meta, title: spec.title, icon: 'Code' }, null, 2)}\n`);
}
