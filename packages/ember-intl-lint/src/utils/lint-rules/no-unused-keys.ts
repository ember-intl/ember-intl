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

  function record(status: 'fail' | 'pass', key: TranslationKey): void {
    if (status === 'fail') {
      if (!ignores.has(key)) {
        lintErrors.push(key);
      }

      return;
    }

    if (ignores.has(key)) {
      ignoresUnused.push(key);
    }
  }

  project.availableKeys.forEach((localeToData, key) => {
    if (project.usedKeys.has(key)) {
      return record('pass', key);
    }

    let isTranslationExternal = true;

    localeToData.forEach((data) => {
      const { isInternal } = project.translationFiles.get(data.filePath)!;

      if (isInternal) {
        isTranslationExternal = false;
      }
    });

    if (isTranslationExternal) {
      return record('pass', key);
    }

    return record('fail', key);
  });

  if (options.fix) {
    if (ignoresUnused.length > 0) {
      const list = ignoresUnused.sort().join(',');

      console.log(`⚠️ no-unused-keys has unused ignores (${list})`);
    }
  }

  return lintErrors;
}
