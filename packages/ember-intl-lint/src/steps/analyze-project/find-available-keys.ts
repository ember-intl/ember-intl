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

    const keys = data.format === 'json' ? inJson(file) : inYaml(file);

    keys.forEach((key) => {
      if (availableKeys.has(key)) {
        availableKeys.get(key)!.push(filePath);
      } else {
        availableKeys.set(key, [filePath]);
      }
    });
  });

  return new Map(Array.from(availableKeys).sort());
}
