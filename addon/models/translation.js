/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import EmptyObject from 'ember-intl/-private/utils/empty-object';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function flatten(src) {
  const result = new EmptyObject();

  for (const key in src) {
    if (!hasOwnProperty.call(src, key)) {
      continue;
    }

    const value = src[key];

    if (typeof value === 'object' && value) {
      const hash = flatten(value);

      for (const suffix in hash) {
        result[`${key}.${suffix}`] = hash[suffix];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

const TranslationModel = EmberObject.extend({
  localeName: null,

  init() {
    this._super();

    if (!this.translations) {
      this.translations = new EmptyObject();
    }
  },

  /**
   * Adds a translation hash
   */
  addTranslations(translations) {
    assign(this.translations, flatten(translations));
  },

  /**
   * Custom accessor hook that can be overridden.
   * This would enable consumers that have dot notated strings
   * to implement this function as `return this[key];`
   */
  getValue(key) {
    return this.translations[key];
  },

  /**
   * Determines if the translation model contains a key
   */
  has(key) {
    return hasOwnProperty.call(this.translations, key);
  },
});

export default TranslationModel;
