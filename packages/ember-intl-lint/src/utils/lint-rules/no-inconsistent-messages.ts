import type {
  Failed,
  IcuArguments,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments } from '../icu-message/compare-icu-arguments.js';
import {
  getOwnLocales,
  getOwnTranslations,
  listFilePaths,
} from './shared/index.js';

type LintOptions = {
  ignores: TranslationKey[];
};

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

function lint(project: Project, lintOptions?: Partial<LintOptions>): Failed {
  const ownLocales = getOwnLocales(project);
  const ownTranslations = getOwnTranslations(project);

  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const failed: Failed = [];

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

    const allIcuArguments: IcuArguments[] = [];

    mappingSubset.forEach((data) => {
      allIcuArguments.push(data.icuArguments);
    });

    let isConsistent = allIcuArgumentsMatch(allIcuArguments);

    ownLocales.forEach((locale) => {
      if (!mappingSubset.has(locale)) {
        isConsistent = false;
      }
    });

    if (isConsistent) {
      return;
    }

    const filePaths = Array.from(mapping.values()).map(
      ({ filePath }) => filePath,
    );
    const details = listFilePaths(filePaths);

    failed.push([key, details].join('\n'));
  });

  return failed;
}

export const noInconsistentMessages = { lint };
