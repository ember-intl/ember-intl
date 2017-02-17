/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import { LiteralWrapper } from './l';
import BaseHelper from '../helper';

const { assert } = Ember;

export function getValue([key], options) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  assert('[ember-intl] translation lookup attempted but no translation key was provided.', key);
  const {
    fallback,
    allowEmpty,
    defaultMessage,
    locale:optionalLocale
  } = options;

  const fallbackTranslation = defaultMessage || fallback;

  const translation = this.intl.lookup(key, optionalLocale, {
    resilient: allowEmpty || typeof fallbackTranslation === 'string'
  });

  return translation || fallbackTranslation;
}

export default BaseHelper.extend({
  getValue,

  format(value, options) {
    return this.intl.formatMessage(value, options);
  }
});
