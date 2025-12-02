import type { Failed, Project, TranslationKey } from '../../types/index.js';

type LintOptions = {
  ignores: TranslationKey[];
};

export function noMissingKeys(
  project: Project,
  lintOptions?: Partial<LintOptions>,
): Failed {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const failed: Failed = [];

  project.usedKeys.forEach((filePaths, key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.availableKeys.has(key)) {
      return;
    }

    const details = `  - Found in ${filePaths.join(', ')}`;

    failed.push([key, details].join('\n'));
  });

  return failed;
}
