import type { Options, Project } from '../types/index.js';
import {
  findAvailableKeys,
  findLocales,
  findTranslationFiles,
  findUsedKeys,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const translationFiles = findTranslationFiles(options);
  const locales = findLocales(translationFiles);

  const availableKeys = findAvailableKeys(translationFiles, locales, options);
  const usedKeys = findUsedKeys(options);

  return {
    availableKeys,
    locales,
    translationFiles,
    usedKeys,
  };
}
