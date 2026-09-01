import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { parseFilePath } from '@codemod-utils/files';

import { replaceT } from './replace-t.js';

export function task(filePath: string, projectRoot: string): void {
  let file = readFileSync(join(projectRoot, filePath), 'utf8');
  let update = false;

  const { ext } = parseFilePath(filePath);

  switch (ext) {
    case '.gjs':
    case '.gts': {
      file = updateJavaScript(file, (code) => {
        const results = replaceT(code);

        if (results.update) {
          update = true;
          return results.file;
        }

        return code;
      });

      break;
    }

    case '.js':
    case '.ts': {
      const results = replaceT(file);

      if (results.update) {
        file = results.file;
        update = true;
      }

      break;
    }
  }

  if (update) {
    writeFileSync(join(projectRoot, filePath), file, 'utf8');
  }
}
