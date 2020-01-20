/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { isEmpty } from '@ember/utils';
import IntlService from '../services/intl';

export default abstract class BaseFormatHelper<T, R, Options> extends Helper {
  readonly intl: IntlService;
  readonly allowEmpty: boolean = false;

  constructor() {
    super(...arguments);

    this.intl = getOwner(this).lookup('service:intl');

    // @ts-ignore the ember types do not currently expose the types for accepting method name
    this.intl.on('localeChanged', this, 'recompute');
  }

  willDestroy() {
    super.willDestroy();

    // @ts-ignore the ember types do not currently expose the types for accepting method name
    this.intl.off('localeChanged', this, 'recompute');
  }

  compute([value]: T[], options: Options & { allowEmpty?: boolean }) {
    if (isEmpty(value)) {
      if (typeof options.allowEmpty === 'undefined' ? this.allowEmpty : options.allowEmpty) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error(`${this} helper requires value attribute.`);
      }
    }

    return this.format(value, options);
  }

  abstract format(value: T, options: Options): R;
}
