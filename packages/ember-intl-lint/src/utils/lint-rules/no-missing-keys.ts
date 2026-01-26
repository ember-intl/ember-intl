import type {
  LintErrors,
  OptionsWithoutConfig,
  Project,
  TranslationKey,
} from '../../types/index.js';

export function noMissingKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: OptionsWithoutConfig,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.usedKeys.forEach((key) => {
    if (project.availableKeys.has(key)) {
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
