import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { parseFilePath } from '@codemod-utils/files';

import { updateAssertion } from './update-assertion.js';

export function task(filePath: string, projectRoot: string): void {
  let file = readFileSync(join(projectRoot, filePath), 'utf8');
  let update = false;

  const { ext } = parseFilePath(filePath);

  switch (ext) {
    case '.gjs':
    case '.gts': {
      file = updateJavaScript(file, (code) => {
        const results = updateAssertion(code);

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
      const results = updateAssertion(file);

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
