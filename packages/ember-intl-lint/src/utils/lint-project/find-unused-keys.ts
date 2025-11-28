import type { Project } from '../../types/index.js';

type LintOptions = {
  ignores: string[];
};

export function findUnusedKeys(
  project: Project,
  lintOptions: Partial<LintOptions> | undefined,
): string[] {
  const failed: string[] = [];
  const ignores = new Set<string>(lintOptions?.ignores ?? []);

  project.availableKeys.forEach((filePaths, key) => {
    if (project.usedKeys.has(key) || ignores.has(key)) {
      return;
    }

    failed.push([key, `  - Found in ${filePaths.join(', ')}`].join('\n'));
  });

  return failed;
}
