/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlService from '../services/intl';
import { addLocaleData } from 'ember-intl/utils/data';
import FormatDate from '../helpers/format-date';
import FormatTime from '../helpers/format-time';
import FormatRelative from '../helpers/format-relative';
import FormatNumber from '../helpers/format-number';
import IntlGet from '../helpers/intl-get';
import FormatHtmlMessage from '../helpers/format-html-message';
import FormatMessage from '../helpers/format-message';

export var injectIntl = function (container) {
    container.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    container.optionsForType('locale', {
        singleton:   true,
        instantiate: true
    });

    container.injection('controller', 'intl', 'service:intl');
    container.injection('component',  'intl', 'service:intl');
    container.injection('route',      'intl', 'service:intl');
    container.injection('model',      'intl', 'service:intl');
    container.injection('view',       'intl', 'service:intl');
    container.injection('formatter',  'intl', 'service:intl');
}

export default {
    name: 'ember-intl',

    initialize: function (container, app) {
        injectIntl(container);

        var seen   = requirejs._eak_seen;
        var prefix = app.modulePrefix;

        Object.keys(seen).filter(function (key) {
            return key.indexOf(prefix + '\/cldrs\/') === 0;
        }).forEach(function (key) {
            addLocaleData(require(key, null, null, true)['default']);
        });

        app.intl = container.lookup('service:intl');
        
        if (Ember.HTMLBars) {
            Ember.HTMLBars._registerHelper('format-date', FormatDate);
            Ember.HTMLBars._registerHelper('format-time', FormatTime);
            Ember.HTMLBars._registerHelper('format-relative', FormatRelative);
            Ember.HTMLBars._registerHelper('format-number', FormatNumber);
            Ember.HTMLBars._registerHelper('format-html-message', FormatHtmlMessage);
            Ember.HTMLBars._registerHelper('format-message', FormatMessage);
        }
    }
}
