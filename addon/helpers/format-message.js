/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import helperFactory from './-base';
import { read } from '../utils/streams';
import { IntlGetStream } from '../utils/intl-get-stream';
import { LiteralWrapper } from './l';

export function getValue(params, hash, intl) {
  let key;

  if (params.length) {
    key = params[0];
  }

  // NOTE: once we drop < 1.13 support this can be removed
  if (key.isStream) {
    if (key instanceof IntlGetStream) {
      return key;
    } else {
      key = read(key);
    }
  }

  if (key instanceof LiteralWrapper) {
    return key.value;
  }

  return intl.findTranslationByKey(key, hash.locale);
}

export default helperFactory('message', getValue);
