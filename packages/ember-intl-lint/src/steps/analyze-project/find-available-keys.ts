import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../../types/index.js';
import {
  inJson,
  inYaml,
} from '../../utils/analyze-project/find-available-keys/index.js';

export function findAvailableKeys(
  translationFiles: Project['translationFiles'],
  options: Options,
): Project['availableKeys'] {
  const { projectRoot } = options;
  const availableKeys: Project['availableKeys'] = new Map();

  translationFiles.forEach((data, filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const translationObject =
      data.format === 'json' ? inJson(file) : inYaml(file);

    for (const [key, message] of Object.entries(translationObject)) {
      if (!availableKeys.has(key)) {
        availableKeys.set(key, new Map());
      }

      availableKeys.get(key)!.set(filePath, {
        message,
      });
    }
  });

  return new Map(Array.from(availableKeys).sort());
}
