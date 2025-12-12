import { join, normalize } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import { unnormalizedJoin } from '../../utils/files/index.js';

function getFormat(ext: string): 'json' | 'yaml' {
  return ext === '.json' ? 'json' : 'yaml';
}

export function findTranslationFiles(
  options: Options,
): Project['translationFiles'] {
  const { config, projectRoot } = options;
  const translationFiles: Project['translationFiles'] = new Map();

  let translationsDir = normalize(config.buildOptions.inputPath);

  let filePaths = findFiles(
    unnormalizedJoin(translationsDir, '**/*.{json,yaml,yml}'),
    {
      projectRoot,
    },
  );

  filePaths.forEach((filePath) => {
    const { ext, name } = parseFilePath(filePath);

    translationFiles.set(filePath, {
      format: getFormat(ext),
      isInternal: true,
      locale: name,
      translationsDir,
    });
  });

  config.addonPaths.forEach((addonPath) => {
    translationsDir = join(addonPath, 'translations');

    filePaths = findFiles(
      unnormalizedJoin(translationsDir, '**/*.{json,yaml,yml}'),
      {
        projectRoot,
      },
    );

    filePaths.forEach((filePath) => {
      const { ext, name } = parseFilePath(filePath);

      translationFiles.set(filePath, {
        format: getFormat(ext),
        isInternal: false,
        locale: name,
        translationsDir,
      });
    });
  });

  return translationFiles;
}
