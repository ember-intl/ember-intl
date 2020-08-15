/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import FormatDateFormatter from './format-date';

/**
 * @private
 * @hide
 */
// @ts-ignore We could use a proper intermediary abstract class, but it's
// unnecessarily complicated.
export default class FormatTime extends FormatDateFormatter {
  static readonly type = 'time';
}
