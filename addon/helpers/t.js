/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';

import BaseHelper from './-format-base';

export function getValue([translationKey], options) {
  assert('[ember-intl] translation lookup attempted but no translation key was provided.', translationKey);

  const { fallback, allowEmpty, defaultMessage, locale: optionalLocale } = options;

  const fallbackTranslation = defaultMessage || fallback;

  const translation = this.intl.lookup(translationKey, optionalLocale, {
    resilient: allowEmpty || typeof fallbackTranslation === 'string'
  });

  return typeof translation === 'string' ? translation : fallbackTranslation;
}

export default BaseHelper.extend({
  getValue,

  format(value, options) {
    if (options && options.htmlSafe === true) {
      return this.intl.formatHtmlMessage(value, options);
    }

    return this.intl.formatMessage(value, options);
  }
});
