/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import { LiteralWrapper } from './l';
import BaseHelper from './-format-base';

const { get, assert, computed } = Ember;

export function getValue([key], { locale:optionalLocale }) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  assert('[ember-intl] translation lookup attempted but no translation key was provided.', key);

  return get(this, 'intl').lookup(key, optionalLocale);
}

export default BaseHelper.extend({
  getValue,
  formatType: 'message',
  formatter: computed.alias('intl.formatMessage')
});
