import { normalize } from 'node:path';

import type { Project } from '../../src/types/index.js';

export function normalizeProject(project: Project): Project {
  const normalized: Project = {
    availableKeys: new Map(),
    translationFiles: new Map(),
    translations: new Map(),
    usedKeys: new Set(),
  };

  project.availableKeys.forEach((localeToData, key) => {
    localeToData.forEach((data, locale) => {
      localeToData.set(locale, {
        ...data,
        filePath: normalize(data.filePath),
      });
    });

    normalized.availableKeys.set(key, localeToData);
  });

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

  normalized.usedKeys = project.usedKeys;

  return normalized;
}
