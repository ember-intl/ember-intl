/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import extend from '../utils/extend';
import { LiteralWrapper } from './l';

import {
  Stream,
  read,
  readHash,
  destroyStream
} from 'ember-intl/utils/streams';

const { get } = Ember;

function getValue(params) {
  return params[0];
}

function helperFactory(formatType, optionalGetValue, optionalReturnEmpty) {
  if (typeof optionalGetValue !== 'function') {
    optionalGetValue = getValue;
  }

  return function legacyIntlHelper(params, hash, options, env) {
    let view = env.data.view;
    let intl = view.container.lookup('service:intl');
    let value = optionalGetValue(params, hash, intl);

    if (typeof value === 'undefined') {
      throw new Error(`format-${formatType} helper requires value`);
    }

    let formatter = view.container.lookup(`ember-intl@formatter:format-${formatType}`);

    let out = new Stream(() => {
      let seenHash = readHash(hash);
      let seenValue = read(value);
      let format = {};

      if (seenValue && seenValue instanceof LiteralWrapper) {
        seenValue = seenValue.value;
      }

      if (optionalReturnEmpty && optionalReturnEmpty(seenValue, seenHash)) {
        return;
      }

      if (seenHash && seenHash.format) {
        format = intl.getFormat(formatType, seenHash.format);
      }

      return formatter.format.call(
        formatter,
        seenValue,
        extend({
          locale: get(intl, '_locale')
        }, format, seenHash),
        get(intl, 'formats')
      );
    });

    function notify() {
      if (out) {
        out.notify();
      }
    }

    if (value && value.isStream && read(value) instanceof LiteralWrapper) {
      value.subscribe(notify, out);
    }

    Object.keys(hash).forEach(function(key) {
      let hashValue = hash[key];

      if (hashValue && hashValue.isStream) {
        hashValue.subscribe(notify, out);
      }
    });

    if (value.isStream) {
      value.subscribe(notify, out);
    }

    view.one('willDestroyElement', () => {
      intl.off('localeChanged', view, notify);
      destroyStream(value);
      destroyStream(out);
    });

    intl.on('localeChanged', view, notify);

    return out;
  };
}

export default helperFactory;
