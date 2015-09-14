/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { LiteralWrapper } from './l';
import { IntlGetStream } from '../utils/intl-get-stream';

import {
  read,
  readHash,
  destroyStream
} from '../utils/streams';

const { assert, Logger:logger } = Ember;

// Backwards compatibility for Ember < 1.13
export default function (value, options) {
  assert('intl-get helper must be used as a subexpression', options.isInline === true);

  logger.warn(`intl-get is deprecated, use {{t 'translation.key'}} or {{format-message 'translation.key'}}`);

  let view = options.data.view;
  let intl = view.container.lookup('service:intl');
  let i18nKey = value;
  let valueStream;

  function translate(key) {
    let seenHash = readHash(options.hash);
    return intl.findTranslationByKey(read(key), seenHash.locale);
  }

  let out = new IntlGetStream(function() {
    return new LiteralWrapper(translate(i18nKey));
  });

  out.setValue = function(newKey) {
    i18nKey = newKey;
    this.notify();
  };

  function notify() {
    if (out) {
      out.setValue(i18nKey);
    }
  }

  if (options.types && options.types[0] === 'ID') {
    valueStream = view.getStream(value);
    i18nKey = read(valueStream);

    valueStream.subscribe(() => {
      i18nKey = read(valueStream);
      notify();
    });
  }

  intl.on('localeChanged', view, notify);

  view.one('willDestroyElement', out, function() {
    intl.off('localeChanged', view, notify);
    destroyStream(valueStream);
    destroyStream(this);
  });

  return out;
}
