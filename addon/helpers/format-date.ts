/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseFormatHelper from './-format-base';
import { FormatterOptions } from '../-private/formatters/-base';
import { Dateish } from '../-private/formatters/format-date';

export default class FormatDateHelper extends BaseFormatHelper<Dateish> {
  get allowEmpty() {
    return true;
  }

  format(value: Dateish, options: FormatterOptions) {
    return this.intl.formatDate(value, options);
  }
}
