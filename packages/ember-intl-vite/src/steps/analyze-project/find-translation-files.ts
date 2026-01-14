import { join, normalize, sep } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';

function getFormat(ext: string): 'json' | 'yaml' {
  return ext === '.json' ? 'json' : 'yaml';
}

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
      const { ext, name: locale } = parseFilePath(filePath);

      translationFiles.set(filePath, {
        format: getFormat(ext),
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
    const { ext, name: locale } = parseFilePath(filePath);

    translationFiles.set(filePath, {
      format: getFormat(ext),
      isInternal: true,
      locale,
      translationsDir,
    });
  });

  return translationFiles;
}
