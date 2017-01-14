/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import BaseHelper from './-format-base';

export default BaseHelper.extend({
  formatType: 'number',
  formatter: Ember.computed.alias('intl.formatNumber')
});
