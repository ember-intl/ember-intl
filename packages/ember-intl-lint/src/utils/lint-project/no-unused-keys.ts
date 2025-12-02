import type { Project } from '../../types/index.js';

type LintOptions = {
  ignores: string[];
};

export function noUnusedKeys(
  project: Project,
  lintOptions?: Partial<LintOptions>,
): string[] {
  const ignores = new Set<string>(lintOptions?.ignores ?? []);
  const failed: string[] = [];

  project.availableKeys.forEach((filePaths, key) => {
    if (ignores.has(key)) {
      return;
    }

    if (project.usedKeys.has(key)) {
      return;
    }

    const details = `  - Found in ${filePaths.join(', ')}`;

    failed.push([key, details].join('\n'));
  });

  return failed;
}
