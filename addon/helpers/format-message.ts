/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseFormatHelper from './-format-base';
import { FormatterOptions } from '../-private/formatters/-base';

export default class FormatMessageHelper extends BaseFormatHelper<string> {
  format(value: string, options: FormatterOptions) {
    return this.intl.formatMessage(value, options);
  }
}
