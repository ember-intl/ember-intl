/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import flatten from 'ember-intl/-private/utils/flatten';
import parse from 'ember-intl/-private/utils/parse';

class Translation {
  translations = new Map();
  asts = new Map();
  _localeName;

  get localeName() {
    return this._localeName;
  }

  constructor(localeName) {
    this._localeName = localeName;
  }

  addTranslations(translations) {
    const flatTranslations = flatten(translations);

    for (const key in flatTranslations) {
      let translation = flatTranslations[key];

      // If it's not a string, coerce it to one.
      if (typeof translation !== 'string') {
        translation = `${translation}`;
      }

      this.translations.set(key, translation);
      this.asts.set(key, parse(translation));
    }
  }

  find(key) {
    if (this.has(key)) {
      return {
        ast: this.asts.get(key),
        original: this.translations.get(key),
      };
    }
  }

  has(key) {
    return this.translations.has(key);
  }
}

export default Translation;
