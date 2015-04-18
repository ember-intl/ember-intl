/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import ENV from '../config/environment';
import IntlService from '../services/intl';
import { addLocaleData } from 'ember-intl/utils/data';
import FormatDate from '../helpers/format-date';
import FormatTime from '../helpers/format-time';
import FormatRelative from '../helpers/format-relative';
import FormatNumber from '../helpers/format-number';
import FormatHtmlMessage from '../helpers/format-html-message';
import FormatMessage from '../helpers/format-message';

export var registerIntl = function (container) {
    var seen   = requirejs._eak_seen;
    var prefix = ENV.modulePrefix;

    container.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    container.optionsForType('locale', {
        singleton:   true,
        instantiate: true
    });

    Object.keys(seen).filter(function (key) {
        return key.indexOf(prefix + '\/cldrs\/') === 0;
    }).forEach(function (key) {
        addLocaleData(require(key, null, null, true)['default']);
    });

    if (Ember.HTMLBars) {
        Ember.HTMLBars._registerHelper('format-date', FormatDate);
        Ember.HTMLBars._registerHelper('format-time', FormatTime);
        Ember.HTMLBars._registerHelper('format-relative', FormatRelative);
        Ember.HTMLBars._registerHelper('format-number', FormatNumber);
        Ember.HTMLBars._registerHelper('format-html-message', FormatHtmlMessage);
        Ember.HTMLBars._registerHelper('format-message', FormatMessage);
    }

    // only here for backwards compat.
    container.register('intl:main', container.lookup('service:intl'), {
        instantiate: false,
        singleton:   true
    });

    container.typeInjection('controller', 'intl', 'service:intl');
    container.typeInjection('component',  'intl', 'service:intl');
    container.typeInjection('route',      'intl', 'service:intl');
    container.typeInjection('model',      'intl', 'service:intl');
    container.typeInjection('view',       'intl', 'service:intl');
    container.typeInjection('formatter',  'intl', 'service:intl');
};

export default {
    name: 'ember-intl',

    initialize: function (container, app) {
        registerIntl(container);
        app.intl = container.lookup('service:intl');
    }
};
