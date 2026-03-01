import { findFiles } from '@codemod-utils/files';

import type { Options, Project, TranslationKey } from '../../types/index.js';
import { findTranslationKeys } from '../../utils/analyze-project/find-used-keys/index.js';
import { createRunWorker, parallelize } from '../../utils/worker/index.js';

export async function findUsedKeys(
  options: Options,
): Promise<Project['usedKeys']> {
  const { projectRoot, src } = options;

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  const runWorker = createRunWorker<TranslationKey[]>(
    '../../utils/analyze-project/find-used-keys/worker.js',
  );

  const taskDatas: [string, Options][] = filePaths.map((filePath) => {
    return [filePath, options];
  });

  const allUsedKeys = await parallelize(findTranslationKeys, {
    runWorker,
    taskDatas,
  });

  return new Set(allUsedKeys.flat().sort());
}
