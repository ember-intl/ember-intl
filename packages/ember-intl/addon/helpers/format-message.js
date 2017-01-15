/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import { LiteralWrapper } from './l';
import BaseHelper from './-format-base';

const { assert } = Ember;

export function getValue([key], { allowEmpty, locale:optionalLocale }) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  assert('[ember-intl] translation lookup attempted but no translation key was provided.', key);

  return this.intl.lookup(key, optionalLocale, {
    resilient: allowEmpty
  });
}

export default BaseHelper.extend({
  getValue,

  format(value, options) {
    return this.intl.formatMessage(value, options);
  }
});
