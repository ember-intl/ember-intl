import type { Options, Project } from '../types/index.js';
import {
  findAvailableKeys,
  findTranslationFiles,
  findUsedKeys,
  mergeTranslationFiles,
} from './analyze-project/index.js';

export async function analyzeProject(options: Options): Promise<Project> {
  const translationFiles = findTranslationFiles(options);
  const translations = mergeTranslationFiles(translationFiles, options);

  const availableKeys = findAvailableKeys(translations);
  const usedKeys = await findUsedKeys(options);

  return {
    availableKeys,
    translationFiles,
    translations,
    usedKeys,
  };
}
