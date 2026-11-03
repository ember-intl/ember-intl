import { findTemplateTags, toEcma } from '@codemod-utils/ast-template-tag';
import { getDefaultConfig } from '@ember-intl/utils/config';

import type { Options, TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript, inTemplate } from './shared/index.js';

const defaultDependencyOptions = getDefaultConfig().lintOptions.dependencies;

export function inGjsGts(
  file: string,
  dependencyOptions: Options['config']['lintOptions']['dependencies'] = defaultDependencyOptions,
): TranslationKey[] {
  const keys: TranslationKey[] = [];

  const ecma = toEcma(file);
  const dependencies = findDependencies(ecma, dependencyOptions);

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
