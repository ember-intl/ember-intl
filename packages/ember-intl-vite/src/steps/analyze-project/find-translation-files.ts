import { join, normalize, sep } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';

export function findTranslationFiles(
  options: Options,
): Project['translationFiles'] {
  const { config, projectRoot } = options;
  const { addonPaths, buildOptions } = config;

  const translationFiles: Project['translationFiles'] = new Map();

  addonPaths.forEach((addonPath) => {
    const translationsDir = join(addonPath, 'translations');

    const filePaths = findFiles(
      join(translationsDir, '**/*.{json,yaml,yml}').replaceAll(sep, '/'),
      {
        projectRoot,
      },
    );

    filePaths.forEach((filePath) => {
      const { name: locale } = parseFilePath(filePath);

      translationFiles.set(filePath, {
        isInternal: false,
        locale,
        translationsDir,
      });
    });
  });

  const translationsDir = normalize(buildOptions.inputPath);

  const filePaths = findFiles(
    join(translationsDir, '**/*.{json,yaml,yml}').replaceAll(sep, '/'),
    {
      projectRoot,
    },
  );

  filePaths.forEach((filePath) => {
    const { name: locale } = parseFilePath(filePath);

    translationFiles.set(filePath, {
      isInternal: true,
      locale,
      translationsDir,
    });
  });

  return translationFiles;
}
