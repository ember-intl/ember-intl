/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import { A as emberArray } from '@ember/array';
import Formatter from './-base';

/**
 * @private
 * @hide
 */
export default class FormatRelative extends Formatter {
  constructor() {
    super();

    this.createNativeFormatter = memoize((locales, options) => {
      return new Intl.RelativeTimeFormat(locales, options);
    });
  }

  get options() {
    return emberArray(['localeMatcher', 'numeric', 'style']);
  }

  format(value, options, context) {
    const { locale } = context;
    const formatterOptions = this.readOptions(options);
    const formatter = this.createNativeFormatter(locale, formatterOptions);

    return formatter.format(value, options.unit);
  }
}
