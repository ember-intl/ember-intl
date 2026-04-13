import type {
  LintErrors,
  Options,
  Project,
  TranslationKey,
} from '../../types/index.js';
import { LintRunWithIgnores } from './shared/index.js';

export async function noMissingKeys(
  project: Project,
  lintOptions: Partial<{
    ignores: TranslationKey[];
  }>,
  options: Options,
): Promise<LintErrors> {
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
    await lintRun.updateConfiguration();
  }

  return lintRun.getLintErrors();
}
