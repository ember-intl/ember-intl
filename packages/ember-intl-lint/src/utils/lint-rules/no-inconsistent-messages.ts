import type {
  IcuArguments,
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments, findIcuArguments } from '../icu-message/index.js';
import { LintRunWithIgnores } from './shared/index.js';

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
  const lintRun = new LintRunWithIgnores({
    ignores: lintOptions.ignores,
    lintRule: 'no-inconsistent-messages',
  });

  const locales = getLocales(project.translationFiles);

  project.availableKeys.forEach((localeToData, key) => {
    let hasTranslation = true;

    locales.forEach((locale) => {
      if (!localeToData.has(locale)) {
        hasTranslation = false;
      }
    });

    if (hasTranslation) {
      const allIcuArguments: IcuArguments[] = [];

      localeToData.forEach((data) => {
        allIcuArguments.push(findIcuArguments(data.message));
      });

      if (allIcuArgumentsMatch(allIcuArguments)) {
        return lintRun.record({
          ignore: key,
          status: 'pass',
        });
      }
    }

    return lintRun.record({
      ignore: key,
      lintError: key,
      status: 'fail',
    });
  });

  if (options.fix) {
    lintRun.reportUnusedIgnores();
  }

  return lintRun.getLintErrors();
}
