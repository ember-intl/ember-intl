/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseFormatHelper from './-format-base';
import { Result } from '../-private/formatters/format-message';
import { formatMessageOptions } from '../services/intl';

export default class FormatMessageHelper extends BaseFormatHelper<string, Result, formatMessageOptions> {
  format(value: string, options: formatMessageOptions) {
    return this.intl.formatMessage(value, options);
  }
}
