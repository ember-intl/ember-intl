import type {
  IcuArguments,
  LintErrors,
  Locale,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments, findIcuArguments } from '../icu-message/index.js';
import { LintRunWithIgnores } from './shared/index.js';

function getLocales(
  translationFiles: Project['translationFiles'],
): Set<string> {
  const locales = new Set<string>();

  translationFiles.forEach((data) => {
    locales.add(data.locale);
  });

  return locales;
}

function listLocales(locales: Set<Locale>): string {
  return Array.from(locales).sort().join(', ');
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
    const localesWithMissingTranslation = new Set<Locale>();
    const localesWithInconsistentArguments = new Set<Locale>();

    locales.forEach((locale) => {
      if (!localeToData.has(locale)) {
        localesWithMissingTranslation.add(locale);
      }
    });

    if (localesWithMissingTranslation.size > 0) {
      return lintRun.record({
        ignore: key,
        lintError: `${key} (missing translation: ${listLocales(localesWithMissingTranslation)})`,
        status: 'fail',
      });
    }

    let target:
      | {
          icuArguments: IcuArguments;
          locale: Locale;
        }
      | undefined;

    for (const [locale, data] of localeToData.entries()) {
      const icuArguments = findIcuArguments(data.message);

      if (target === undefined) {
        target = {
          icuArguments,
          locale,
        };

        continue;
      }

      if (!compareIcuArguments(icuArguments, target.icuArguments)) {
        localesWithInconsistentArguments.add(locale);
        localesWithInconsistentArguments.add(target.locale);
      }
    }

    if (localesWithInconsistentArguments.size === 0) {
      return lintRun.record({
        ignore: key,
        status: 'pass',
      });
    }

    return lintRun.record({
      ignore: key,
      lintError: `${key} (inconsistent arguments: ${listLocales(localesWithInconsistentArguments)})`,
      status: 'fail',
    });
  });

  if (options.fix) {
    lintRun.reportUnusedIgnores();
  }

  return lintRun.getLintErrors();
}
