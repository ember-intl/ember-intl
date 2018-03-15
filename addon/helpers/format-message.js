/*
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import { deprecate } from '@ember/application/deprecations';

import { LiteralWrapper } from './l';
import BaseHelper from './-format-base';

export function getValue([key], options) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  assert('[ember-intl] translation lookup attempted but no translation key was provided.', key);

  deprecate(
    `[ember-intl] {{${this.helperType}}} only accepts translation strings as the first parameter.
    You likely want to use the {{t}} helper instead.`,
    false,
    {
      id: `ember-intl-${this.helperType}-string-literals-only`,
      until: '3.0.0'
    }
  );

  const { fallback, allowEmpty, defaultMessage, locale: optionalLocale } = options;

  const fallbackTranslation = defaultMessage || fallback;

  const translation = this.intl.lookup(key, optionalLocale, {
    resilient: allowEmpty || typeof fallbackTranslation === 'string'
  });

  return typeof translation === 'string' ? translation : fallbackTranslation;
}

/**
 * @class FormatMessageHelper
 */
export default BaseHelper.extend({
  getValue,
  helperType: 'format-message',

  format(value, options) {
    return this.intl.formatMessage(value, options);
  }
});
