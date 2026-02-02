import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import {
  findTranslationKeys,
  runWorker,
} from '../../utils/analyze-project/find-used-keys/index.js';
import { processItems } from '../../utils/worker/index.js';

export async function findUsedKeys(
  options: Options,
): Promise<Project['usedKeys']> {
  const { projectRoot, src } = options;

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  const items = filePaths.map((filePath) => {
    return join(projectRoot, filePath);
  });

  const allUsedKeys = await processItems({
    items,
    runWorker,
    task: findTranslationKeys,
  });

  return new Set(allUsedKeys.flat().sort());
}
