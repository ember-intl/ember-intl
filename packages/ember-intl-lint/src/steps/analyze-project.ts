import type { Options, Project } from '../types/index.js';
import { findAvailableKeys, findUsedKeys } from './analyze-project/index.js';

export function analyzeProject(options: Options): Project {
  const availableKeys = findAvailableKeys(options);
  const usedKeys = findUsedKeys(options);

  return {
    availableKeys,
    usedKeys,
  };
}
