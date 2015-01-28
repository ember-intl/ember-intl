/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import env from '../config/environment';
import IntlService from '../service/intl';

var get = Ember.get;
var makeArray = Ember.makeArray;

function ServiceInitializer (container, app, options) {
    options = options || {};

    this.app            = app;
    this.container      = container;
    this.locales        = app.locales || options.locales;
    this.defaultLocales = app.defaultLocales || options.defaultLocales;
}

ServiceInitializer.prototype = {
    constructor: ServiceInitializer,

    init: function () {
        var app            = this.app;
        var ServiceKlass   = app.IntlService || IntlService;
        var service        = ServiceKlass.create({ container: this.container });
        var locales        = makeArray(this.locales);
        var defaultLocales = makeArray(this.defaultLocales);

        Ember.assert('Locales has not been configured.  You must define a locale on your app.', locales || defaultLocales);

        service.setProperties({
            locales:        locales,
            defaultLocales: defaultLocales
        });

        app.register('intl:main', service, {
            singleton:   true,
            instantiate: false
        });

        app.intl = service;

        app.inject('controller',            'intl', 'intl:main');
        app.inject('component',             'intl', 'intl:main');
        app.inject('route',                 'intl', 'intl:main');
        app.inject('model',                 'intl', 'intl:main');
        app.inject('view',                  'intl', 'intl:main');
        app.inject('ember-intl@formatter',  'intl', 'intl:main');

        return service;
    }
};

export default {
    name: 'ember-intl',

    initialize: function (container, app) {
        Ember.keys(requirejs._eak_seen).filter(function (key) {
            return key.indexOf(env.modulePrefix + '\/locales\/') === 0;
        }).forEach(function (moduleName) {
            var locale = require(moduleName, null, null, true)['default'];

            IntlMessageFormat.__addLocaleData(locale);
            IntlRelativeFormat.__addLocaleData(locale);
        });

        var initializer = new ServiceInitializer(container, app, {
            locales:        get(env, 'intl.locales')        || app.locales,
            defaultLocales: get(env, 'intl.defaultLocales') || app.defaultLocales
        });

        initializer.init();
    }
}
