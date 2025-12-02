import type {
  Failed,
  IcuArguments,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { compareIcuArguments } from '../icu-message/compare-icu-arguments.js';
import { getOwnTranslations } from './shared/index.js';

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

type LintOptions = {
  ignores: TranslationKey[];
};

export function noInconsistentMessages(
  project: Project,
  lintOptions?: Partial<LintOptions>,
): Failed {
  const ownTranslations = getOwnTranslations(project);
  const ignores = new Set<TranslationKey>(lintOptions?.ignores ?? []);
  const failed: Failed = [];

  project.availableKeys.forEach((mapping, key) => {
    if (ignores.has(key)) {
      return;
    }

    const ownMapping: typeof mapping = new Map();

    mapping.forEach((data, filePath) => {
      if (ownTranslations.has(filePath)) {
        ownMapping.set(filePath, data);
      }
    });

    if (ownMapping.size === 0) {
      return;
    }

    const allIcuArguments: IcuArguments[] = [];

    ownMapping.forEach((data) => {
      allIcuArguments.push(data.icuArguments);
    });

    let isConsistent = allIcuArgumentsMatch(allIcuArguments);

    ownTranslations.forEach((filePath) => {
      if (!ownMapping.has(filePath)) {
        isConsistent = false;
      }
    });

    if (isConsistent) {
      return;
    }

    const details = `  - Found in ${Array.from(mapping.keys()).join(', ')}`;

    failed.push([key, details].join('\n'));
  });

  return failed;
}
