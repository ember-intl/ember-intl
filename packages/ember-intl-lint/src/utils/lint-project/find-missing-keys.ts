import type { Project } from '../../types/index.js';

export function findMissingKeys(project: Project): string[] {
  const failed: string[] = [];

  project.usedKeys.forEach((filePaths, key) => {
    if (project.availableKeys.has(key)) {
      return;
    }

    failed.push([key, `  - Found in ${filePaths.join(', ')}`].join('\n'));
  });

  return failed;
}
