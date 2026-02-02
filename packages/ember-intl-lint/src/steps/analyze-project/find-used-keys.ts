import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import { findTranslationKeys } from '../../utils/analyze-project/find-used-keys/index.js';

export function findUsedKeys(options: Options): Project['usedKeys'] {
  const { projectRoot, src } = options;
  const usedKeys: Project['usedKeys'] = new Set();

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const keys = findTranslationKeys(join(projectRoot, filePath));

    keys.forEach((key) => {
      usedKeys.add(key);
    });
  });

  return new Set(Array.from(usedKeys).sort());
}
