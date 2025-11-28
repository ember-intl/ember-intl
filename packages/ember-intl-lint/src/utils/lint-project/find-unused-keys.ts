import type { Project } from '../../types/index.js';

export function findUnusedKeys(project: Project): string[] {
  const failed: string[] = [];

  project.availableKeys.forEach((filePaths, key) => {
    if (project.usedKeys.has(key)) {
      return;
    }

    failed.push([key, `  - Found in ${filePaths.join(', ')}`].join('\n'));
  });

  return failed;
}
