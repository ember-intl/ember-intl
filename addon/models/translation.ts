/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject from '@ember/object';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export interface Translations {
  [key: string]: string | Translations;
}

function flatten(translations: Map<string, string>, src: Translations, prefix?: string) {
  for (const key in src) {
    if (!hasOwnProperty.call(src, key)) {
      continue;
    }

    const value = src[key];
    const tKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value) {
      flatten(translations, value, tKey);
    } else {
      translations.set(tKey, value);
    }
  }
}

// export as named and default so the default adapter can augment the class types because default exports cannot be augmented
// see http://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
export class TranslationModel extends EmberObject {
  translations: Map<string, string> = new Map();

  init() {
    super.init();

    // translations doesn't get set in constructor on ember <= 3.4
    if (!this.translations) {
      this.translations = new Map();
    }
  }

  /**
   * Adds a translation hash
   */
  addTranslations(translations: Translations) {
    flatten(this.translations, translations);
  }

  /**
   * Custom accessor hook that can be overridden.
   * This would enable consumers that have dot notated strings
   * to implement this function as `return this[key];`
   */
  getValue(key: string) {
    return this.translations.get(key);
  }

  /**
   * Determines if the translation model contains a key
   */
  has(key: string) {
    return this.translations.has(key);
  }
}

export default TranslationModel;
