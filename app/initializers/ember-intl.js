/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import ENV from '../config/environment';
import { addLocaleData } from 'ember-intl/utils/data';
import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';

function filterBy (type) {
    return Object.keys(requirejs._eak_seen).filter(function (key) {
        return key.indexOf(ENV.modulePrefix + '\/' + type + '\/') === 0;
    });
}

export var registerIntl = function (container, service) {
    if (!service) {
        service = container.lookup('service:intl');
    }

    filterBy('cldrs').forEach(function (key) {
        addLocaleData(require(key, null, null, true)['default']);
    });

    filterBy('translations').forEach(function (key) {
        var localeSplit = key.split('\/');
        var locale = localeSplit[localeSplit.length - 1];
        service.createLocale(locale, require(key, null, null, true)['default']);
    });

    container.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    if (!container.has('adapter:-intl-adapter')) {
        container.register('adapter:-intl-adapter', IntlAdapter);
    }

    // only here for backwards compat.
    container.register('intl:main', container.lookup('service:intl'), {
        instantiate: false,
        singleton:   true
    });

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
        app.intl = container.lookup('service:intl');
        registerIntl(container, app.intl);
    }
};
