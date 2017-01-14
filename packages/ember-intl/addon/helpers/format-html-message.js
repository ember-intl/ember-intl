/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import BaseHelper from './-format-base';
import { getValue } from './format-message';

export default BaseHelper.extend({
  getValue,
  formatType: 'html-message',
  formatter: Ember.computed.alias('intl.formatHtmlMessage')
});
