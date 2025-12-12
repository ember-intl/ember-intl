import { sep } from 'node:path';

export function listFilePaths(filePaths: string[]): string {
  const list = filePaths
    .map((filePath) => filePath.replaceAll(sep, '/'))
    .join(', ');

  return `  - Found in ${list}`;
}
