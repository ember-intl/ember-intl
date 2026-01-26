import type { LintErrors, Project, TranslationKey } from '../../types/index.js';

export function noMissingKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.usedKeys.forEach((key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.availableKeys.has(key)) {
      return;
    }

    lintErrors.push(key);
  });

  return lintErrors;
}
