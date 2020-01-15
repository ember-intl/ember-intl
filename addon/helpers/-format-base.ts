/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { isEmpty } from '@ember/utils';
import { getWithDefault } from '@ember/object';

const AbstractHelper = Helper.extend({
  intl: null,

  init() {
    if (this.constructor === AbstractHelper) {
      throw new Error('FormatHelper is an abstract class, can not be instantiated directly.');
    }

    this._super();

    this.intl = getOwner(this).lookup('service:intl');
    this.intl.on('localeChanged', this, 'recompute');
  },

  format() {
    throw new Error('not implemented');
  },

  compute([value], options) {
    if (isEmpty(value)) {
      if (getWithDefault(options, 'allowEmpty', this.allowEmpty)) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error(`${this} helper requires value attribute.`);
      }
    }

    return this.format(value, options);
  },

  willDestroy() {
    this._super();

    this.intl.off('localeChanged', this, 'recompute');
  }
});

export default AbstractHelper;
