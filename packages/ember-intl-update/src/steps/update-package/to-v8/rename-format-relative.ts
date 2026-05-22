import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Options } from '../../../types/index.js';
import { task } from './rename-format-relative/task.js';

export async function renameFormatRelative(options: Options): Promise<void> {
  const { projectRoot, src } = options;

  const filePaths = findFiles(
    [
      `${src}/{components,templates}/**/*.{gjs,gts,hbs,js,ts}`,
      `tests/integration/**/*-test.{gjs,gts}`,
    ],
    {
      projectRoot,
    },
  );

  const datasets: Parameters<typeof task>[] = filePaths.map((filePath) => {
    return [filePath, projectRoot];
  });

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './rename-format-relative/worker.js',
  });
}
