import type {
  IcuArguments,
  LintErrors,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments } from '../icu-message/compare-icu-arguments.js';
import { getLocales, getOwnTranslations } from './shared/index.js';

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
  const locales = getLocales(project);
  const ownTranslations = getOwnTranslations(project);

  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((mapping, key) => {
    if (ignores.has(key)) {
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

    let hasTranslation = true;

    locales.forEach((locale) => {
      if (!mappingSubset.has(locale)) {
        hasTranslation = false;
      }
    });

    if (!hasTranslation) {
      lintErrors.push(key);
    }

    const allIcuArguments: IcuArguments[] = [];

    mappingSubset.forEach((data) => {
      allIcuArguments.push(data.icuArguments);
    });

    if (!allIcuArgumentsMatch(allIcuArguments)) {
      lintErrors.push(key);
      return;
    }
  });

  return lintErrors;
}
