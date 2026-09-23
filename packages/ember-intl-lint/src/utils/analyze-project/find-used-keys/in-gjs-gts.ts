import { findTemplateTags, toEcma } from '@codemod-utils/ast-template-tag';

import type { Dependency, TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript, inTemplate } from './shared/index.js';

export function inGjsGts(
  file: string,
  customDependencies: Dependency[] = [],
): TranslationKey[] {
  const keys: TranslationKey[] = [];

  const ecma = toEcma(file);
  const dependencies = findDependencies(ecma, customDependencies);

  keys.push(...inJavascript(ecma, { dependencies }));

  const templateTags = findTemplateTags(file);

  templateTags.forEach(({ contents }) => {
    keys.push(
      ...inTemplate(contents, {
        dependencies,
        isTemplateTag: true,
      }),
    );
  });

  return Array.from(new Set(keys)).sort();
}
