/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

import extend from '../utils/extend';

const { Helper, inject, get, computed } = Ember;

function helperFactory(formatType, optionalReturnEmpty) {
  return Helper.extend({
    intl: inject.service(),
    formatType: formatType,

    formatter: computed('formatType', {
      get() {
        return getOwner(this).lookup(`ember-intl@formatter:format-${formatType}`);
      }
    }).readOnly(),

    init(...args) {
      this._super(...args);

      get(this, 'intl').on('localeChanged', this, this.recompute);
    },

    getValue([value]) {
      return value;
    },

    compute(params, hash) {
      const value = this.getValue(params, hash);

      if (optionalReturnEmpty && optionalReturnEmpty(value, hash)) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error(`format-${formatType} helper requires value`);
      }

      const intl = get(this, 'intl');
      let locale = get(intl, '_locale');

      if (Array.isArray(locale)) {
        locale = locale[0];
      }

      let format = {};

      if (hash.format) {
        format = intl.getFormat(formatType, hash.format);
      }

      return get(this, 'formatter').format(
        value,
        extend({ locale }, format, hash),
        get(intl, 'formats')
      );
    },

    destroy(...args) {
      this._super(...args);

      get(this, 'intl').off('localeChanged', this, this.recompute);
    }
  });
}

export default helperFactory;
