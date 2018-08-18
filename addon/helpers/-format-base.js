/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { isEmpty } from '@ember/utils';
import Helper from '@ember/component/helper';
import { get, getWithDefault } from '@ember/object';
import { service } from '@ember-decorators/service';

class BaseHelper extends Helper {
  @service
  intl;

  constructor() {
    super(...arguments);

    get(this, 'intl').on('localeChanged', this, this.recompute);
  }

  format() {
    throw new Error('not implemented');
  }

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
  }

  willDestroy() {
    this._super();

    get(this, 'intl').off('localeChanged', this, this.recompute);
  }
}

export default BaseHelper;
