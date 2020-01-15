/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import BaseFormatHelper from './-format-base';
import { FormatterOptions } from '../-private/formatters/-base';

export default class TranslationHelper extends BaseFormatHelper<string> {
  format(key: string, options: FormatterOptions) {
    assert('[ember-intl] translation lookup attempted but no translation key was provided.', Boolean(key));

    return this.intl.t(key, options);
  }
}
