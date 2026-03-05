import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Options, Project } from '../../types/index.js';
import { task } from './find-used-keys/task.js';

export async function findUsedKeys(
  options: Options,
): Promise<Project['usedKeys']> {
  const { projectRoot, src } = options;

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  const datasets: [string, Options][] = filePaths.map((filePath) => {
    return [filePath, options];
  });

  const allUsedKeys = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './find-used-keys/worker.js',
  });

  return new Set(allUsedKeys.flat().sort());
}
