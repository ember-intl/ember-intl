/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { LiteralWrapper } from './l';

const { Helper, inject, get, Logger:logger } = Ember;

let IntlGetHelper = null;

if (Helper) {
  IntlGetHelper = Helper.extend({
    intl: inject.service(),

    init(...args) {
      this._super(...args);

      logger.warn(`intl-get is deprecated, use {{t 'translation.key'}} or {{format-message 'translation.key'}}`);

      const intl = get(this, 'intl');
      intl.on('localeChanged', this, this.recompute);
    },

    destroy(...args) {
      const intl = get(this, 'intl');
      intl.off('localeChanged', this, this.recompute);
      this._super(...args);
    },

    compute(params, hash = {}) {
      const intl = get(this, 'intl');

      return new LiteralWrapper(intl.findTranslationByKey(params[0], hash.locale));
    }
  });
}


export default IntlGetHelper;
