import type {
  LintErrors,
  Project,
  TranslationFilePath,
  TranslationKey,
} from '../../types/index.js';

function getOwnTranslations(project: Project): Set<TranslationFilePath> {
  const filePaths = new Set<TranslationFilePath>();

  project.translationFiles.forEach((data, filePath) => {
    if (data.isInternal) {
      filePaths.add(filePath);
    }
  });

  return filePaths;
}

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
