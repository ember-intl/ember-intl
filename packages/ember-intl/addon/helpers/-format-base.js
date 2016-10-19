/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import assign from '../utils/assign';

const { Helper, inject, get, computed, isEmpty, getWithDefault } = Ember;

function helperFactory(formatType, helperOptions = {}) {
  return Helper.extend({
    intl: inject.service(),
    formatType: formatType,

    formatter: computed('formatType', {
      get() {
        const intl = get(this, 'intl');

        return intl.lookupFormatter(formatType);
      }
    }).readOnly(),

    init(...args) {
      this._super(...args);

      get(this, 'intl').on('localeChanged', this, this.recompute);
    },

    getValue([value]) {
      return value;
    },

    compute(params, hash = {}) {
      const value = this.getValue(params, hash);
      const allowEmpty = getWithDefault(hash, 'allowEmpty', helperOptions.allowEmpty);

      if (isEmpty(value)) {
        if ('fallback' in hash) {
          return hash.fallback;
        }

        if (allowEmpty) {
          return;
        }

        if (typeof value === 'undefined') {
          throw new Error(`format-${formatType} helper requires value`);
        }
      }

      const intl = get(this, 'intl');
      let format = {};

      if (hash.format) {
        format = intl.getFormat(formatType, hash.format);
      }

      return get(this, 'formatter').compute(value, assign({}, format, hash), {
        formats: get(intl, 'formats'),
        locale: hash.locale || get(intl, '_locale')
      });
    },

    destroy(...args) {
      this._super(...args);

      get(this, 'intl').off('localeChanged', this, this.recompute);
    }
  });
}

export default helperFactory;
