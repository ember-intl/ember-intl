/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseHelper from './-format-base';
import { assign } from '@ember/polyfills';
import { get } from '@ember/object';

export default BaseHelper.extend({
  format(value, options) {
    const style = get(options, "style");
    const opts = { value };
    const message = style ? `{value, shortNumber, ${style}}` : `{value, shortNumber}`;

    assign(opts, options);

    return this.intl.formatMessage(message, opts);
  }
});
