import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Options } from '../../../types/index.js';
import { task } from './remove-nested-translation-json/task.js';

export async function removeNestedTranslationJson(
  options: Options,
): Promise<void> {
  const { packageType, projectRoot } = options;
  let pattern: string[];

  switch (packageType) {
    default: {
      pattern = [
        'tests/{acceptance,integration,unit}/**/*-test.{gjs,gts,js,ts}',
      ];
    }
  }

  const filePaths = findFiles(pattern, { projectRoot });

  const datasets: Parameters<typeof task>[] = filePaths.map((filePath) => {
    return [filePath, projectRoot];
  });

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './remove-nested-translation-json/worker.js',
  });
}
