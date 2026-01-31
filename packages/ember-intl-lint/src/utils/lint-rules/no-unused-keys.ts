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
      return lintRun.record({
        ignore: key,
        status: 'pass',
      });
    }

    let isTranslationExternal = true;

    localeToData.forEach((data) => {
      const { isInternal } = project.translationFiles.get(data.filePath)!;

      if (isInternal) {
        isTranslationExternal = false;
      }
    });

    if (isTranslationExternal) {
      return lintRun.record({
        ignore: key,
        status: 'pass',
      });
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
