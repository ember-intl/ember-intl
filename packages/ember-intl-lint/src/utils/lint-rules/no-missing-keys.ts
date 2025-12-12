import type { Failed, Project, TranslationKey } from '../../types/index.js';
import { listFilePaths } from './shared/index.js';

export function noMissingKeys(data: {
  lintOptions?: Partial<{
    ignores: TranslationKey[];
  }>;
  project: Project;
}): Failed {
  const { lintOptions, project } = data;

  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const failed: Failed = [];

  project.usedKeys.forEach((filePaths, key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.availableKeys.has(key)) {
      return;
    }

    failed.push({
      key,
      details: listFilePaths(filePaths),
    });
  });

  return failed;
}
