import type {
  IcuArguments,
  LintErrors,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments } from '../icu-message/compare-icu-arguments.js';

function allIcuArgumentsMatch(allIcuArguments: IcuArguments[]): boolean {
  for (let i = 0; i < allIcuArguments.length; i++) {
    for (let j = i + 1; j < allIcuArguments.length; j++) {
      if (!compareIcuArguments(allIcuArguments[i]!, allIcuArguments[j]!)) {
        return false;
      }
    }
  }

  return true;
}

export function noInconsistentMessages(
  project: Project,
  lintOptions?: Partial<{
    ignores: TranslationKey[];
  }>,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((mapping, key) => {
    if (ignores.has(key)) {
      return;
    }

    let hasTranslation = true;

    project.locales.forEach((locale) => {
      if (!mapping.has(locale)) {
        hasTranslation = false;
      }
    });

    if (!hasTranslation) {
      lintErrors.push(key);
    }

    const allIcuArguments: IcuArguments[] = [];

    mapping.forEach((data) => {
      allIcuArguments.push(data.icuArguments);
    });

    if (!allIcuArgumentsMatch(allIcuArguments)) {
      lintErrors.push(key);
      return;
    }
  });

  return lintErrors;
}
