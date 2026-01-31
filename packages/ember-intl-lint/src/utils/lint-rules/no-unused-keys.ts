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
  const ignoresUnused: TranslationKey[] = [];
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((localeToData, key) => {
    if (project.usedKeys.has(key)) {
      if (ignores.has(key)) {
        ignoresUnused.push(key);
      }

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
      if (ignores.has(key)) {
        ignoresUnused.push(key);
      }

      return;
    }

    if (ignores.has(key)) {
      return;
    }

    lintErrors.push(key);
  });

  if (options.fix) {
    if (ignoresUnused.length > 0) {
      const list = ignoresUnused.sort().join(',');

      console.log(`⚠️ no-unused-keys has unused ignores (${list})`);
    }
  }

  return lintErrors;
}
