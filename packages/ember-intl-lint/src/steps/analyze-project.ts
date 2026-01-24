import type { Options, Project } from '../types/index.js';
import {
  findAvailableKeys,
  findTranslationFiles,
  findUsedKeys,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const translationFiles = findTranslationFiles(options);

  const availableKeys = findAvailableKeys(translationFiles, options);
  const usedKeys = findUsedKeys(options);

  return {
    availableKeys,
    translationFiles,
    usedKeys,
  };
}
