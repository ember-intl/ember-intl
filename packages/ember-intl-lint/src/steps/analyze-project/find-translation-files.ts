import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';

function getFormat(ext: string): 'json' | 'yaml' {
  return ext === '.json' ? 'json' : 'yaml';
}

export function findTranslationFiles(
  options: Options,
): Project['translationFiles'] {
  const { config, projectRoot } = options;
  const translationFiles: Project['translationFiles'] = new Map();

  let rootDir = config.buildOptions.inputPath;

  let filePaths = findFiles(join(rootDir, '**/*.{json,yaml,yml}'), {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const { ext, name } = parseFilePath(filePath);

    translationFiles.set(filePath, {
      format: getFormat(ext),
      isInternal: true,
      locale: name,
      rootDir,
    });
  });

  config.addonPaths.forEach((addonPath) => {
    rootDir = join(addonPath, 'translations');

    filePaths = findFiles(join(rootDir, '**/*.{json,yaml,yml}'), {
      projectRoot,
    });

    filePaths.forEach((filePath) => {
      const { ext, name } = parseFilePath(filePath);

      translationFiles.set(filePath, {
        format: getFormat(ext),
        isInternal: false,
        locale: name,
        rootDir,
      });
    });
  });

  return translationFiles;
}
