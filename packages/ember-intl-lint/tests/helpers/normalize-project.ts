import { normalize } from 'node:path';

import type { Project } from '../../src/types/index.js';

export function normalizeProject(project: Project): Project {
  const normalized: Project = {
    availableKeys: new Map(),
    locales: [],
    translationFiles: new Map(),
    usedKeys: new Set(),
  };

  project.availableKeys.forEach((mapping, key) => {
    const mappingNormalized: typeof mapping = new Map();

    mapping.forEach((data, locale) => {
      mappingNormalized.set(locale, {
        ...data,
        filePath: normalize(data.filePath),
      });
    });

    normalized.availableKeys.set(key, mappingNormalized);
  });

  project.locales.forEach((locale) => {
    normalized.locales.push(locale);
  });

  project.translationFiles.forEach((data, translationFilePath) => {
    normalized.translationFiles.set(normalize(translationFilePath), {
      ...data,
      translationsDir: normalize(data.translationsDir),
    });
  });

  project.usedKeys.forEach((key) => {
    normalized.usedKeys.add(key);
  });

  return normalized;
}
