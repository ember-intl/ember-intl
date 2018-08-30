/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import BaseHelper from './-format-base';

export default BaseHelper.extend({
  format(value, options) {
    assert('[ember-intl] translation lookup attempted but no translation key was provided.', value);

    return this.intl.t(value, options);
  }
});
