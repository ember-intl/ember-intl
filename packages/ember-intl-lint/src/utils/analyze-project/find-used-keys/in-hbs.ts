import type { TranslationKey } from '../../../types/index.js';
import { inTemplate } from './shared/index.js';

export function inHbs(file: string): TranslationKey[] {
  const keys = inTemplate(file, {
    dependencies: {
      helpers: {
        t: 't',
        tKey: 't-key',
      },
      services: {
        intl: undefined,
      },
    },
    isTemplateTag: false,
  });

  return Array.from(new Set(keys)).sort();
}
