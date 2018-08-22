/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import { assert } from '@ember/debug';
import BaseHelper from './-format-base';

class TranslateHelper extends BaseHelper {
  format(value, options) {
    assert('[ember-intl] translation lookup attempted but no translation key was provided.', value);

    return get(this, 'intl').t(value, options);
  }
}

export default TranslateHelper;
