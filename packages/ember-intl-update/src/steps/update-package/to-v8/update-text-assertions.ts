import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Options } from '../../../types/index.js';
import { task } from './update-text-assertions/task.js';

export async function updateTextAssertions(options: Options): Promise<void> {
  const { projectRoot } = options;

  const filePaths = findFiles(
    'tests/{acceptance,integration,unit}/**/*-test.{gjs,gts,js,ts}',
    {
      projectRoot,
    },
  );

  const datasets: Parameters<typeof task>[] = filePaths.map((filePath) => {
    return [filePath, projectRoot];
  });

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './rename-format-releative/worker.js',
  });
}
