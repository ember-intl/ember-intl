import type { Failed, Project, TranslationKey } from '../../types/index.js';
import { getOwnTranslations, listFilePaths } from './shared/index.js';

type LintOptions = {
  ignores: TranslationKey[];
};

export function noUnusedKeys(
  project: Project,
  lintOptions?: Partial<LintOptions>,
): Failed {
  const ownTranslations = getOwnTranslations(project);

  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const failed: Failed = [];

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

    const filePaths = Array.from(mapping.values()).map(
      ({ filePath }) => filePath,
    );
    const details = listFilePaths(filePaths);

    failed.push([key, details].join('\n'));
  });

  return failed;
}
