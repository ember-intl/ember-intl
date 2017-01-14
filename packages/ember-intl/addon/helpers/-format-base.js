/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { Helper, inject, get, isEmpty, getWithDefault } = Ember;

export default Helper.extend({
  intl: inject.service(),
  formatType: null,

  init() {
    this._super(...arguments);

    get(this, 'intl').on('localeChanged', this, this.recompute);
  },

  getValue([value]) {
    return value;
  },

  compute(params, options) {
    const value = this.getValue(params, options);
    const allowEmpty = getWithDefault(options, 'allowEmpty', this.allowEmpty);

    if (isEmpty(value)) {
      if ('fallback' in options) {
        return options.fallback;
      }

      if (allowEmpty) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error(`format-${this.formatType} helper requires value`);
      }
    }

    const intl = get(this, 'intl');

    return get(this, 'formatter').call(intl, value, options);
  },

  destroy() {
    this._super(...arguments);

    get(this, 'intl').off('localeChanged', this, this.recompute);
  }
});
