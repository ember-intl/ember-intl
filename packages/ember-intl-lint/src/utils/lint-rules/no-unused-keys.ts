import type {
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { LintRunWithIgnores } from './shared/index.js';

export function noUnusedKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: Options,
): LintErrors {
  const lintRun = new LintRunWithIgnores({
    ignores: lintOptions.ignores,
    lintRule: 'no-unused-keys',
  });

  project.availableKeys.forEach((localeToData, key) => {
    if (project.usedKeys.has(key)) {
      return lintRun.record('pass', key);
    }

    let isTranslationExternal = true;

    localeToData.forEach((data) => {
      const { isInternal } = project.translationFiles.get(data.filePath)!;

      if (isInternal) {
        isTranslationExternal = false;
      }
    });

    if (isTranslationExternal) {
      return lintRun.record('pass', key);
    }

    return lintRun.record('fail', key);
  });

  if (options.fix) {
    lintRun.reportUnusedIgnores();
  }

  return lintRun.getLintErrors();
}
