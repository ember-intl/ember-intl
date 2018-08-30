/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { A as emberArray } from '@ember/array';
import createFormatCache from 'intl-format-cache';
import IntlRelativeFormat from 'intl-relativeformat';

import Formatter from './-base';

export default class FormatRelative extends Formatter {
  constructor() {
    super();
    this.formatter = createFormatCache(IntlRelativeFormat);
  }

  get options() {
    return emberArray(['locale', 'format', 'style', 'units']);
  }

  format(value, options, ctx) {
    let dateValue = new Date(value);
    let formatOptions;

    if (options && typeof options.now !== 'undefined') {
      formatOptions = {
        now: options.now
      };
    }

    return this._format(dateValue, this.readOptions(options), formatOptions, ctx);
  }
}
