import type { Options, Project } from '../types/index.js';
import {
  findAvailableKeys,
  findTranslationFiles,
  findUsedKeys,
  mergeTranslationFiles,
} from './analyze-project/index.js';

export async function analyzeProject(options: Options): Promise<Project> {
  console.time('analyzeProject - findTranslationFiles');
  const translationFiles = findTranslationFiles(options);
  console.timeEnd('analyzeProject - findTranslationFiles');

  console.time('analyzeProject - mergeTranslationFiles');
  const translations = mergeTranslationFiles(translationFiles, options);
  console.timeEnd('analyzeProject - mergeTranslationFiles');

  console.time('analyzeProject - availableKeys');
  const availableKeys = findAvailableKeys(translations);
  console.timeEnd('analyzeProject - availableKeys');

  console.time('analyzeProject - findUsedKeys');
  const usedKeys = await findUsedKeys(options);
  console.timeEnd('analyzeProject - findUsedKeys');

  return {
    availableKeys,
    translationFiles,
    translations,
    usedKeys,
  };
}
