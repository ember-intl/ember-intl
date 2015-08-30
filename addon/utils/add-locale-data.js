/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

export default function(data) {
  IntlMessageFormat.__addLocaleData(data);
  IntlRelativeFormat.__addLocaleData(data);
}
