import { join, normalize, sep } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';

function getPattern(translationsDir: string): string {
  return join(translationsDir, '**/*.{json,yaml,yml}').replaceAll(sep, '/');
}

export function findTranslationFiles(
  options: Options,
): Project['translationFiles'] {
  const { config, projectRoot } = options;
  const { addonPaths, buildOptions } = config;

  const translationFiles: Project['translationFiles'] = new Map();

  addonPaths.forEach((addonPath) => {
    const translationsDir = join(addonPath, 'translations');

    const filePaths = findFiles(getPattern(translationsDir), {
      projectRoot,
    });

    filePaths.forEach((filePath) => {
      const { name } = parseFilePath(filePath);

      translationFiles.set(filePath, {
        isInternal: false,
        locale: name,
        translationsDir,
      });
    });
  });

  // App's translations take precedence
  const translationsDir = normalize(buildOptions.inputPath);

  const filePaths = findFiles(getPattern(translationsDir), {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const { name } = parseFilePath(filePath);

    translationFiles.set(filePath, {
      isInternal: true,
      locale: name,
      translationsDir,
    });
  });

  return translationFiles;
}
