/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import legacyICUHelper from 'ember-intl/legacy/helpers/icu';
import ICUHelper from 'ember-intl/helpers/icu';

var Helper = ICUHelper;

if (!Helper) {
    Helper = legacyICUHelper;
}

export default Helper;
