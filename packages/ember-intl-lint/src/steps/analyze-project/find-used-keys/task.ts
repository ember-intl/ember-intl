import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { Options, TranslationKey } from '../../../types/index.js';
import {
  inGjsGts,
  inHbs,
  inJsTs,
} from '../../../utils/analyze-project/find-used-keys/index.js';

export function task(filePath: string, options: Options): TranslationKey[] {
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
