import { normalize } from 'node:path';

import type { Project } from '../../src/translations/types.js';

export function normalizeTranslationFiles(
  translationFiles: Project['translationFiles'],
): Project['translationFiles'] {
  const normalizedTranslationFiles: Project['translationFiles'] = new Map();

  translationFiles.forEach((data, filePath) => {
    normalizedTranslationFiles.set(normalize(filePath), {
      ...data,
      translationsDir: normalize(data.translationsDir),
    });
  });

  return normalizedTranslationFiles;
}
