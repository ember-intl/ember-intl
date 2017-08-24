/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import { assert } from '@ember/debug';
import BaseHelper from './-base';

export function getValue([translationKey], options) {
  assert('[ember-intl] translation lookup attempted but no translation key was provided.', translationKey);

  const { fallback, allowEmpty, defaultMessage, locale: optionalLocale } = options;
  const fallbackTranslation = defaultMessage || fallback;

  const translation = get(this, 'intl').lookup(translationKey, optionalLocale, {
    resilient: allowEmpty || typeof fallbackTranslation === 'string'
  });

  return typeof translation === 'string' ? translation : fallbackTranslation;
}

export default BaseHelper.extend({
  getValue,

  format(value, options) {
    return get(this, 'intl').formatMessage(value, options);
  }
});
