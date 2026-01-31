import type {
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { LintRunWithIgnores } from './shared/index.js';

export function noMissingKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: Options,
): LintErrors {
  const lintRun = new LintRunWithIgnores({
    ignores: lintOptions.ignores,
    lintRule: 'no-missing-keys',
  });

  project.usedKeys.forEach((key) => {
    if (project.availableKeys.has(key)) {
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
