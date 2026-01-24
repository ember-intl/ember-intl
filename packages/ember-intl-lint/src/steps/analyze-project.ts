import type { Options, Project } from '../types/index.js';
import {
  findAvailableKeys,
  findTranslationFiles,
  findUsedKeys,
  mergeTranslationFiles,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const translationFiles = findTranslationFiles(options);
  const translations = mergeTranslationFiles(translationFiles, options);

  const availableKeys = findAvailableKeys(translations);
  const usedKeys = findUsedKeys(options);

  return {
    availableKeys,
    translationFiles,
    translations,
    usedKeys,
  };
}
