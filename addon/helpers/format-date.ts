/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseFormatHelper from './-format-base';
import { Dateish } from '../-private/formatters/format-date';
import { formatDateOptions } from '../services/intl';

export default class FormatDateHelper extends BaseFormatHelper<Dateish, string, formatDateOptions> {
  readonly allowEmpty = true;

  format(value: Dateish, options: formatDateOptions) {
    return this.intl.formatDate(value, options);
  }
}
