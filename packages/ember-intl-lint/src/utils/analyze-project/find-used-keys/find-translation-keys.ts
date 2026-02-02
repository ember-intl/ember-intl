import { readFileSync } from 'node:fs';

import { parseFilePath } from '@codemod-utils/files';

import type { TranslationKey } from '../../../types/index.js';
import { inGjsGts } from './in-gjs-gts.js';
import { inHbs } from './in-hbs.js';
import { inJsTs } from './in-js-ts.js';

export function findTranslationKeys(
  absoluteFilePath: string,
): TranslationKey[] {
  const file = readFileSync(absoluteFilePath, 'utf8');
  const { ext } = parseFilePath(absoluteFilePath);

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
