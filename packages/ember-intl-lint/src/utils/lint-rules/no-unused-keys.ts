import type {
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';

export function noUnusedKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: Options,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((localeToData, key) => {
    if (project.usedKeys.has(key)) {
      return;
    }

    let isTranslationExternal = true;

    localeToData.forEach((data) => {
      const { isInternal } = project.translationFiles.get(data.filePath)!;

      if (isInternal) {
        isTranslationExternal = false;
      }
    });

    if (isTranslationExternal) {
      return;
    }

    if (ignores.has(key)) {
      return;
    }

    lintErrors.push(key);
  });

  if (options.fix) {
    // TODO: Update ignores
  }

  return lintErrors;
}
