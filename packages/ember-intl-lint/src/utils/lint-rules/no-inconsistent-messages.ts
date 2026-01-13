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

function getOwnLocales(project: Project): Set<string> {
  const locales = new Set<string>();

  project.translationFiles.forEach((data) => {
    if (data.isInternal) {
      locales.add(data.locale);
    }
  });

  return locales;
}

export function noInconsistentMessages(
  project: Project,
  lintOptions?: Partial<{
    ignores: TranslationKey[];
  }>,
): LintErrors {
  const ownLocales = getOwnLocales(project);

  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  project.availableKeys.forEach((mapping, key) => {
    if (ignores.has(key)) {
      return;
    }

    const allIcuArguments: IcuArguments[] = [];

    mapping.forEach((data) => {
      allIcuArguments.push(data.icuArguments);
    });

    let isConsistent = allIcuArgumentsMatch(allIcuArguments);

    ownLocales.forEach((locale) => {
      if (!mapping.has(locale)) {
        isConsistent = false;
      }
    });

    if (isConsistent) {
      return;
    }

    lintErrors.push(key);
  });

  return lintErrors;
}
