import { findFiles } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import { findTranslationKeys } from '../../utils/analyze-project/find-used-keys/index.js';
import { parallelize } from '../../utils/worker/index.js';

export async function findUsedKeys(
  options: Options,
): Promise<Project['usedKeys']> {
  const { projectRoot, src } = options;

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  const taskDatas: [string, Options][] = filePaths.map((filePath) => {
    return [filePath, options];
  });

  const allUsedKeys = await parallelize(findTranslationKeys, {
    taskDatas,
    workerFilePath: '../../utils/analyze-project/find-used-keys/worker.js',
  });

  return new Set(allUsedKeys.flat().sort());
}
