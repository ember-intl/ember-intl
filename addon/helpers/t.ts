/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import BaseFormatHelper from './-format-base';
import { Result } from '../-private/formatters/format-message';
import { tOptions } from '../services/intl';

export default class TranslationHelper extends BaseFormatHelper<string, Result, tOptions> {
  format(key: string, options: tOptions) {
    assert('[ember-intl] translation lookup attempted but no translation key was provided.', Boolean(key));

    return this.intl.t(key, options);
  }
}
