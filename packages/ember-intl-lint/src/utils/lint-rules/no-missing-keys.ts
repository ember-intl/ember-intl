import type {
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';

export function noMissingKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: Options,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const ignoresUnused: TranslationKey[] = [];
  const lintErrors: LintErrors = [];

  project.usedKeys.forEach((key) => {
    if (project.availableKeys.has(key)) {
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

      console.log(`⚠️ no-missing-keys has unused ignores (${list})`);
    }
  }

  return lintErrors;
}
