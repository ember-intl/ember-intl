/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import helperFactory from './-base';

export function getValue(params, hash, intl) {
  if (params.length) {
    return params[0];
  }

  if (hash && hash.hasOwnProperty('id')) {
    return intl.findTranslationByKey(hash.id, hash.locale);
  }
}

export default helperFactory('message', getValue);
