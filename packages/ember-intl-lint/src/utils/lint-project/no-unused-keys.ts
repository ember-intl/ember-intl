import type { Failed, Project, TranslationKey } from '../../types/index.js';
import { getOwnTranslations } from './shared/index.js';

type LintOptions = {
  ignores: TranslationKey[];
};

export function noUnusedKeys(
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

    if (project.usedKeys.has(key)) {
      return;
    }

    const details = `  - Found in ${Array.from(mapping.keys()).join(', ')}`;

    failed.push([key, details].join('\n'));
  });

  return failed;
}
