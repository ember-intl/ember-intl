import type { Options, Project } from '../types/index.js';
import {
  findTranslationFiles,
  findTranslations,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const translationFiles = findTranslationFiles(options);
  const translations = findTranslations(translationFiles, options);

  return {
    translationFiles,
    translations,
  };
}
