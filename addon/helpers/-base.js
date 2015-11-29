/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

import extend from '../utils/extend';

const { Helper, inject, get, computed } = Ember;

function getValue(params) {
    return params[0];
}

function helperFactory(formatType, optionalGetValue, optionalReturnEmpty) {
  return Helper.extend({
    intl: inject.service(),
    formatType: formatType,
    getValue: optionalGetValue || getValue,

    formatter: computed('formatType', {
      get() {
        return getOwner(this).lookup(`ember-intl@formatter:format-${formatType}`);
      }
    }).readOnly(),

    init(...args) {
      this._super(...args);
      get(this, 'intl').on('localeChanged', this, this.recompute);
    },

    compute(params, hash) {
      const intl = get(this, 'intl');
      const formatter = get(this, 'formatter');
      const value = this.getValue(params, hash, intl);

      if (optionalReturnEmpty && optionalReturnEmpty(value, hash)) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error(`format-${formatType} helper requires value`);
      }

      let locale = get(intl, '_locale');

      if (Array.isArray(locale)) {
        locale = locale[0];
      }

      let format = {};

      if (hash.format) {
        format = intl.getFormat(formatType, hash.format);
      }

      return formatter.format(
        value,
        extend({
          locale: locale
        }, format, hash),
        get(intl, 'formats')
      );
    },

    destroy(...args) {
      const intl = get(this, 'intl');
      intl.off('localeChanged', this, this.recompute);
      this._super(...args);
    }
  });
}

export default helperFactory;
