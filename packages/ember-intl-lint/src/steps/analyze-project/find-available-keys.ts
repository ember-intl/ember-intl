import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Config, Options, Project } from '../../types/index.js';
import {
  inJson,
  inYaml,
} from '../../utils/analyze-project/find-available-keys/index.js';

function canSkip(config: Config): boolean {
  return (
    config.rules['find-missing-keys'] === false &&
    config.rules['find-unused-keys'] === false
  );
}

export function findAvailableKeys(options: Options): Project['availableKeys'] {
  const { config, projectRoot } = options;

  const availableKeys: Project['availableKeys'] = new Map();

  if (canSkip(config)) {
    return availableKeys;
  }

  const filePaths = findFiles(
    [
      'translations/**/*.{json,yaml,yml}',
      ...config.addonPaths.map((addonPath) => {
        return join(addonPath, 'translations/**/*.{json,yaml,yml}');
      }),
    ],
    {
      projectRoot,
    },
  );

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');
    const { ext } = parseFilePath(filePath);

    let keys: string[] = [];

    switch (ext) {
      case '.json': {
        keys = inJson(file);
        break;
      }

      case '.yaml':
      case '.yml': {
        keys = inYaml(file);
        break;
      }
    }

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
