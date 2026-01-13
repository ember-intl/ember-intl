import type { LintErrors, Project, TranslationKey } from '../../types/index.js';

export function noUnusedKeys(
  project: Project,
  lintOptions?: Partial<{
    ignores: TranslationKey[];
  }>,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((_mapping, key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.usedKeys.has(key)) {
      return;
    }

    lintErrors.push(key);
  });

  return lintErrors;
}
