import type {
  IcuArguments,
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments, findIcuArguments } from '../icu-message/index.js';

function allIcuArgumentsMatch(allIcuArguments: IcuArguments[]): boolean {
  for (let i = 1; i < allIcuArguments.length; i++) {
    if (!compareIcuArguments(allIcuArguments[i]!, allIcuArguments[0]!)) {
      return false;
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
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: Options,
): LintErrors {
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const lintErrors: LintErrors = [];

  const locales = getLocales(project.translationFiles);

  project.availableKeys.forEach((localeToData, key) => {
    const missingLocales: string[] = [];

    locales.forEach((locale) => {
      if (!localeToData.has(locale)) {
        missingLocales.push(locale);
      }
    });

    if (missingLocales.length > 0) {
      if (!ignores.has(key)) {
        lintErrors.push(
          `${key} (missing in: ${missingLocales.sort().join(', ')})`,
        );
      }

      return;
    }

    const allIcuArguments: IcuArguments[] = [];
    const localeList: string[] = [];

    localeToData.forEach((data, locale) => {
      allIcuArguments.push(findIcuArguments(data.message));
      localeList.push(locale);
    });

    if (allIcuArgumentsMatch(allIcuArguments)) {
      return;
    }

    if (ignores.has(key)) {
      return;
    }

    const groups: string[][] = [];
    const assigned = new Set<number>();

    for (let i = 0; i < allIcuArguments.length; i++) {
      if (assigned.has(i)) {
        continue;
      }

      const group = [localeList[i]!];
      assigned.add(i);

      for (let j = i + 1; j < allIcuArguments.length; j++) {
        if (assigned.has(j)) {
          continue;
        }

        if (compareIcuArguments(allIcuArguments[i]!, allIcuArguments[j]!)) {
          group.push(localeList[j]!);
          assigned.add(j);
        }
      }

      groups.push(group.sort());
    }

    groups.sort((a, b) => a[0]!.localeCompare(b[0]!));

    const detail = groups.map((g) => g.join(', ')).join(' ≠ ');

    lintErrors.push(`${key} (${detail})`);
  });

  if (options.fix) {
    // TODO: Update ignores
  }

  return lintErrors;
}
