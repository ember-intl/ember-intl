import type { Options, Project } from '../types/index.js';
import {
  findTranslationFiles,
  mergeTranslationFiles,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const translationFiles = findTranslationFiles(options);
  const translations = mergeTranslationFiles(translationFiles, options);

  return {
    translationFiles,
    translations,
  };
}
