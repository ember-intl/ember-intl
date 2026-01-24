import type {
  IcuArguments,
  LintErrors,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments, findIcuArguments } from '../icu-message/index.js';

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

function getLocales(
  translationFiles: Project['translationFiles'],
): Set<string> {
  const locales = new Set<string>();

  translationFiles.forEach((data) => {
    locales.add(data.locale);
  });

  return locales;
}

export function noInconsistentMessages(
  project: Project,
  lintOptions?: Partial<{
    ignores: TranslationKey[];
  }>,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  const locales = getLocales(project.translationFiles);

  project.availableKeys.forEach((localeToData, key) => {
    if (ignores.has(key)) {
      return;
    }

    let hasTranslation = true;

    locales.forEach((locale) => {
      if (!localeToData.has(locale)) {
        hasTranslation = false;
      }
    });

    if (!hasTranslation) {
      lintErrors.push(key);
    }

    const allIcuArguments: IcuArguments[] = [];

    localeToData.forEach((data) => {
      allIcuArguments.push(findIcuArguments(data.message));
    });

    if (allIcuArgumentsMatch(allIcuArguments)) {
      return;
    }

    lintErrors.push(key);
  });

  return lintErrors;
}
