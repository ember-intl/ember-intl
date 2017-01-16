/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import factory from './-format-base';
import { LiteralWrapper } from './l';

const { get, assert } = Ember;

export function getValue([key], { allowEmpty, locale:optionalLocale }) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  assert('[ember-intl] translation lookup attempted but no translation key was provided.', key);

  return get(this, 'intl').lookup(key, optionalLocale, {
    resilient: allowEmpty
  });
}

export default factory('message').extend({
  getValue
});
