import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  updateJavaScript,
  updateTemplates,
} from '@codemod-utils/ast-template-tag';
import { parseFilePath } from '@codemod-utils/files';

import { updateHelperInvocations } from './update-helper-invocations.js';
import { updateImports } from './update-imports.js';
import { updateServiceInvocations } from './update-service-invocations.js';

export function task(filePath: string, projectRoot: string): void {
  let file = readFileSync(join(projectRoot, filePath), 'utf8');
  let update = false;

  const { ext } = parseFilePath(filePath);

  switch (ext) {
    case '.gjs':
    case '.gts': {
      file = updateJavaScript(file, (code) => {
        const results = updateServiceInvocations(code, {
          from: 'formatRelative',
          to: 'formatRelativeTime',
        });

        if (results.update) {
          update = true;
          return results.file;
        }

        return code;
      });

      let localName: string | undefined;

      file = updateJavaScript(file, (code) => {
        const results = updateImports(code);

        if (results.update) {
          localName = results.localName;
          update = true;
          return results.file;
        }

        return code;
      });

      if (localName) {
        file = updateTemplates(file, (code) => {
          const results = updateHelperInvocations(code, {
            from: localName!,
            to: 'formatRelativeTime',
          });

          return results.file;
        });
      }

      break;
    }

    case '.hbs': {
      const results = updateHelperInvocations(file, {
        from: 'format-relative',
        to: 'format-relative-time',
      });

      if (results.update) {
        file = results.file;
        update = true;
      }

      break;
    }

    case '.js':
    case '.ts': {
      const results = updateServiceInvocations(file, {
        from: 'formatRelative',
        to: 'formatRelativeTime',
      });

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
