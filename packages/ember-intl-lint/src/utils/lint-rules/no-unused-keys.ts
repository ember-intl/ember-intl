import type { LintErrors, Project, TranslationKey } from '../../types/index.js';
import { getOwnTranslations } from './shared/index.js';

export function noUnusedKeys(
  project: Project,
  lintOptions?: Partial<{
    ignores: TranslationKey[];
  }>,
): LintErrors {
  const ownTranslations = getOwnTranslations(project);

  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((mapping, key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.usedKeys.has(key)) {
      return;
    }

    const mappingSubset: typeof mapping = new Map();

    mapping.forEach((data, locale) => {
      if (ownTranslations.has(data.filePath)) {
        mappingSubset.set(locale, data);
      }
    });

    if (mappingSubset.size === 0) {
      return;
    }

    lintErrors.push(key);
  });

  return lintErrors;
}
