/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import BaseFormatHelper from './-format-base';
import { formatTimeOptions } from '../services/intl';
import { Dateish } from '../-private/formatters/format-date';

export default class FormatTimeHelper extends BaseFormatHelper<Dateish, string, formatTimeOptions> {
  format(value: Dateish, options: formatTimeOptions) {
    return this.intl.formatTime(value, options);
  }
}
