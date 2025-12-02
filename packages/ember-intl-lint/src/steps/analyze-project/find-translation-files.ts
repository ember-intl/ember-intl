import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';

function getFormat(filePath: string): 'json' | 'yaml' {
  const { ext } = parseFilePath(filePath);

  return ext === '.json' ? 'json' : 'yaml';
}

export function findTranslationFiles(
  options: Options,
): Project['translationFiles'] {
  const { config, projectRoot } = options;
  const translationFiles: Project['translationFiles'] = new Map();

  let filePaths = findFiles('translations/**/*.{json,yaml,yml}', {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    translationFiles.set(filePath, {
      format: getFormat(filePath),
      isInternal: true,
    });
  });

  filePaths = findFiles(
    config.addonPaths.map((addonPath) => {
      return join(addonPath, 'translations/**/*.{json,yaml,yml}');
    }),
    {
      projectRoot,
    },
  );

  filePaths.forEach((filePath) => {
    translationFiles.set(filePath, {
      format: getFormat(filePath),
      isInternal: false,
    });
  });

  return translationFiles;
}
