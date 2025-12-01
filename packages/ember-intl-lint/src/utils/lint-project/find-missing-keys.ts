import type { Project } from '../../types/index.js';

type LintOptions = {
  ignores: string[];
};

export function findMissingKeys(
  project: Pick<Project, 'availableKeys' | 'usedKeys'>,
  lintOptions?: Partial<LintOptions>,
): string[] {
  const failed: string[] = [];
  const ignores = new Set<string>(lintOptions?.ignores ?? []);

  project.usedKeys.forEach((filePaths, key) => {
    if (project.availableKeys.has(key) || ignores.has(key)) {
      return;
    }

    failed.push([key, `  - Found in ${filePaths.join(', ')}`].join('\n'));
  });

  return failed;
}
