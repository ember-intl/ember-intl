import { join } from 'node:path';

import { findFiles, moveFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

export function removeSpacesInTranslationFolderName(options: Options): void {
  const { packageType, projectRoot } = options;
  let pattern: string[];

  switch (packageType) {
    case 'v1-addon': {
      pattern = [
        'tests/dummy/translations/**/*.{json,yaml,yml}',
        'translations/**/*.{json,yaml,yml}',
      ];

      break;
    }

    default: {
      pattern = ['translations/**/*.{json,yaml,yml}'];
    }
  }

  const filePaths = findFiles(pattern, { projectRoot });

  const filePathMap = new Map(
    filePaths.map((oldFilePath) => {
      const { base, dir } = parseFilePath(oldFilePath);

      const newFilePath = join(dir.replaceAll(' ', '_'), base);

      return [oldFilePath, newFilePath];
    }),
  );

  moveFiles(filePathMap, { projectRoot });
}
