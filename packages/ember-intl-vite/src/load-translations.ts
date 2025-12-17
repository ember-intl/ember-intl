import type { Plugin } from 'vite';

import type { Options } from './types/index.js';

export function loadTranslations(options?: Options): Plugin {
  console.log(options);

  return {
    name: 'load-translations',
  };
}
