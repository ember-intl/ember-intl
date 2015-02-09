/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlService from '../services/intl';
import { addLocaleData } from 'ember-intl/utils/data';

export default {
    name: 'ember-intl',

    initialize: function (container, app) {
        var seen   = requirejs._eak_seen;
        var prefix = app.modulePrefix;

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

        var ServiceKlass = app.IntlService || IntlService;
        var service      = ServiceKlass.create({ container: container });

        app.register('intl:main', service, {
            singleton:   true,
            instantiate: false
        });

        app.intl = service;

        app.inject('controller', 'intl', 'intl:main');
        app.inject('component',  'intl', 'intl:main');
        app.inject('route',      'intl', 'intl:main');
        app.inject('model',      'intl', 'intl:main');
        app.inject('view',       'intl', 'intl:main');
        app.inject('formatter',  'intl', 'intl:main');
    }
}
