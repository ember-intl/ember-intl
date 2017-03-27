/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseHelper from './-format-base';
import { getValue } from './format-message';

export default BaseHelper.extend({
  getValue,
  helperType: 'format-html-message',

  format(value, options) {
    return this.intl.formatHtmlMessage(value, options);
  }
});
