/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import ENV from '../config/environment';
import { addLocaleData } from 'ember-intl/utils/data';
import { filterBy } from 'ember-intl/utils/initialize';
import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';

export var registerIntl = function (container, service) {
    if (!service) {
        service = container.lookup('service:intl');
    }

    filterBy(ENV, 'cldrs').forEach((key) => {
        addLocaleData(require(key, null, null, true)['default']);
    });

    filterBy(ENV, 'translations').forEach((key) => {
        let localeSplit = key.split('\/');
        let locale = localeSplit[localeSplit.length - 1];
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

    initialize(registry, application) {
        application.intl = registry.lookup('service:intl');

        registry.optionsForType('formats', {
            singleton:   true,
            instantiate: false
        });

        if (!registry.has('adapter:-intl-adapter')) {
            registry.register('adapter:-intl-adapter', IntlAdapter);
        }

        // only here for backwards compat.
        registry.register('intl:main', registry.lookup('service:intl'), {
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
};
