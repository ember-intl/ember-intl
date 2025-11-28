import type { Options, Project } from '../types/index.js';
import { findUsedKeys } from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const usedKeys = findUsedKeys(options);

  return {
    usedKeys,
  };
}
