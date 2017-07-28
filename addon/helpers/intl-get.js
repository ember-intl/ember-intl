/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import { LiteralWrapper } from './l';

const { Helper, inject, get, deprecate } = Ember;

const IntlGetHelper = Helper.extend({
  intl: inject.service(),

  init() {
    this._super();

    deprecate(`[ember-int] intl-get is deprecated, use {{t 'translation.key'}}`, false, {
      id: 'ember-intl-t-helper',
      until: '3.0.0'
    });

    get(this, 'intl').on('localeChanged', this, this.recompute);
  },

  compute(params, hash = {}) {
    return new LiteralWrapper(get(this, 'intl').lookup(params[0], hash.locale));
  },

  willDestroy() {
    this._super();

    get(this, 'intl').off('localeChanged', this, this.recompute);
  }
});

export default IntlGetHelper;
