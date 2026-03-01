import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { Options, TranslationKey } from '../../../types/index.js';
import { inGjsGts } from './in-gjs-gts.js';
import { inHbs } from './in-hbs.js';
import { inJsTs } from './in-js-ts.js';

export function findTranslationKeys(
  filePath: string,
  options: Options,
): TranslationKey[] {
  const { projectRoot } = options;

  const file = readFileSync(join(projectRoot, filePath), 'utf8');
  const { ext } = parseFilePath(filePath);

  switch (ext) {
    case '.gjs':
    case '.gts': {
      return inGjsGts(file, {
        isTypeScript: ext === '.gts',
      });
    }

    case '.hbs': {
      return inHbs(file);
    }

    case '.js':
    case '.ts': {
      return inJsTs(file, {
        isTypeScript: ext === '.ts',
      });
    }

    default: {
      return [];
    }
  }
}
