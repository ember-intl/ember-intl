/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import helperFactory from './-base';
import { LiteralWrapper } from './l';

export function getValue([key], hash, intl) {
  if (key && key instanceof LiteralWrapper) {
    return key.value;
  }

  return intl.findTranslationByKey(key, hash.locale);
}

export default helperFactory('message', getValue);
