/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import { LiteralWrapper } from './l';

const { Helper, inject, get, deprecate } = Ember;

const IntlGetHelper = Helper.extend({
  intl: inject.service(),

  init(...args) {
    this._super(...args);

    deprecate(`[ember-int] intl-get is deprecated, use {{t 'translation.key'}} or {{format-message 'translation.key'}}`, false, {
      id: 'ember-intl-t-helper'
    });

    get(this, 'intl').on('localeChanged', this, this.recompute);
  },

  compute(params, hash = {}) {
    return new LiteralWrapper(get(this, 'intl').findTranslationByKey(params[0], hash.locale));
  },

  destroy(...args) {
    this._super(...args);

    get(this, 'intl').off('localeChanged', this, this.recompute);
  }
});

export default IntlGetHelper;
