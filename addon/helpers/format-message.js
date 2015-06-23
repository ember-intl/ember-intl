/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import ICU from '../models/icu';

var extend = Ember.$.extend;

export default Ember.Helper.extend({
    intl: Ember.inject.service(),

    formatter: computed({
        get() {
            return this.container.lookup(`ember-intl@formatter:format-message`);
        }
    }),

    onIntlLocaleChanged: Ember.observer('intl.locale', function() {
        this.recompute();
    }),

    compute(params, hash) {
        let value = params[0];
        let formatter = Ember.get(this, 'formatter');
        let format = Object.create(null);
        let intl = Ember.get(this, 'intl');

        if (value instanceof ICU) {
            value = value.toString();
        } else {
            value = intl.findTranslation(value, hash.locale);
        }

        if (hash.format) {
            format = intl.getFormat('message', hash.format);
        }

        return formatter.format(
            value,
            extend(Ember.getProperties(intl, 'locale'), format, hash)
        );
    }
});
