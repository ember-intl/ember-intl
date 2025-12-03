import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project, TranslationKey } from '../../types/index.js';
import {
  inGjsGts,
  inHbs,
  inJsTs,
} from '../../utils/analyze-project/find-used-keys/index.js';

export function findUsedKeys(options: Options): Project['usedKeys'] {
  const { projectRoot, src } = options;
  const usedKeys: Project['usedKeys'] = new Map();

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');
    const { ext } = parseFilePath(filePath);

    let keys: TranslationKey[] = [];

    switch (ext) {
      case '.gjs':
      case '.gts': {
        keys = inGjsGts(file, {
          isTypeScript: ext === '.gts',
        });
        break;
      }

      case '.hbs': {
        keys = inHbs(file);
        break;
      }

      case '.js':
      case '.ts': {
        keys = inJsTs(file, {
          isTypeScript: ext === '.ts',
        });
        break;
      }
    }

    keys.forEach((key) => {
      if (usedKeys.has(key)) {
        usedKeys.get(key)!.push(filePath);
      } else {
        usedKeys.set(key, [filePath]);
      }
    });
  });

  return new Map(Array.from(usedKeys).sort());
}
