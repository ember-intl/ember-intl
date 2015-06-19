/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import legacyIntlGet from 'ember-intl/legacy/helpers/intl-get';
import IntlGet from 'ember-intl/helpers/intl-get';

var Helper = IntlGet;

if (!Helper) {
    Helper = legacyIntlGet;
}

export default Helper;
