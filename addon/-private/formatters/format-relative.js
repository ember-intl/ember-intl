/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import { A as emberArray } from '@ember/array';
import IntlRelativeFormat from '@ember-intl/intl-relativeformat';
import Formatter from './-base';

export default class FormatRelative extends Formatter {
  constructor() {
    super();

    this.createNativeFormatter = memoize((locales, options) => {
      return new IntlRelativeFormat(locales, options);
    });
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
