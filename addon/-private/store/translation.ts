/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import type { MessageFormatElement } from 'intl-messageformat-parser';
import flatten, { NestedStructure } from 'ember-intl/-private/utils/flatten';
import parse from 'ember-intl/-private/utils/parse';

export type TranslationAST = MessageFormatElement[];

export type Translations = NestedStructure<string>;

class Translation {
  private readonly translations = new Map<string, string>();
  private readonly asts = new Map<string, MessageFormatElement[]>();
  private readonly _localeName: string;

  get localeName() {
    return this._localeName;
  }

  constructor(localeName: string) {
    this._localeName = localeName;
  }

  addTranslations(translations: Translations): void {
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

  find(key: string): void | { ast: TranslationAST; original: string } {
    if (this.has(key)) {
      return {
        ast: this.asts.get(key)!,
        original: this.translations.get(key)!,
      };
    }
  }

  has(key: string): boolean {
    return this.translations.has(key);
  }
}

export default Translation;
