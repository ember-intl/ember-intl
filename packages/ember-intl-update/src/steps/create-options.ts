import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot } = codemodOptions;

  return {
    projectRoot,
  };
}
