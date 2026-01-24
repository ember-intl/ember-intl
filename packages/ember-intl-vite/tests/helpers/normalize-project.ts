import { normalize } from 'node:path';

import type { Project } from '../../src/types/index.js';

export function normalizeProject(project: Project): Project {
  const normalized: Project = {
    translationFiles: new Map(),
    translations: new Map(),
  };

  project.translationFiles.forEach((data, filePath) => {
    normalized.translationFiles.set(normalize(filePath), {
      ...data,
      translationsDir: normalize(data.translationsDir),
    });
  });

  project.translations.forEach((keyToData, locale) => {
    keyToData.forEach((data, key) => {
      keyToData.set(key, {
        ...data,
        filePath: normalize(data.filePath),
      });
    });

    normalized.translations.set(locale, keyToData);
  });

  return normalized;
}
