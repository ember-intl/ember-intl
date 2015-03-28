/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { addLocaleData } from 'ember-intl/utils/data';
import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';
import ENV from '../config/environment';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';

export var registerIntl = function (container) {
    var seen   = requirejs._eak_seen;
    var prefix = ENV.modulePrefix;

    Object.keys(seen).filter(function (key) {
        return key.indexOf(prefix + '\/cldrs\/') === 0;
    }).forEach(function (key) {
        addLocaleData(require(key, null, null, true)['default']);
    });

    container.optionsForType('translation', {
        singleton:   true,
        instantiate: true
    });

    container.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    if (!container.has('adapter:-intl-adapter')) {
        container.register('adapter:-intl-adapter', IntlAdapter);
    }

    Ember.HTMLBars._registerHelper('format-date', FormatDate);
    Ember.HTMLBars._registerHelper('format-time', FormatTime);
    Ember.HTMLBars._registerHelper('format-relative', FormatRelative);
    Ember.HTMLBars._registerHelper('format-number', FormatNumber);
    Ember.HTMLBars._registerHelper('format-html-message', FormatHtmlMessage);
    Ember.HTMLBars._registerHelper('format-message', FormatMessage);
}

export default {
    name: 'ember-intl',

    initialize: function (container, app) {
        registerIntl(container);

        app.intl = container.lookup('service:intl');
    }
}
