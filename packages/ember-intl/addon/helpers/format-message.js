/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import factory from './-format-base';
import { LiteralWrapper } from './l';

const { get } = Ember;

export function getValue([key], hash) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  return get(this, 'intl').findTranslationByKey(key, hash.locale);
}

export default factory('message').extend({
  getValue
});
