import type { Failed, Project, TranslationKey } from '../../types/index.js';
import { listFilePaths } from './shared/index.js';

type LintOptions = {
  ignores: TranslationKey[];
};

function lint(project: Project, lintOptions?: Partial<LintOptions>): Failed {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const failed: Failed = [];

  project.usedKeys.forEach((filePaths, key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.availableKeys.has(key)) {
      return;
    }

    const details = listFilePaths(filePaths);

    failed.push([key, details].join('\n'));
  });

  return failed;
}

export const noMissingKeys = { lint };
