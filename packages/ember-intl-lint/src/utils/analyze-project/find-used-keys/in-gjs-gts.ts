import { findTemplateTags, toEcma } from '@codemod-utils/ast-template-tag';

import type { TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript, inTemplate } from './shared/index.js';

type Data = {
  isTypeScript: boolean;
};

export function inGjsGts(file: string, data: Data): TranslationKey[] {
  const keys: TranslationKey[] = [];

  const ecma = toEcma(file);
  const dependencies = findDependencies(ecma, {
    isTypeScript: data.isTypeScript,
  });

  keys.push(
    ...inJavascript(ecma, {
      dependencies,
      isTypeScript: data.isTypeScript,
    }),
  );

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
