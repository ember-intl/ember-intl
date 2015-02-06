/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlService from '../service/intl';
import { addLocaleData } from 'ember-intl/utils/data';

var get = Ember.get;
var makeArray = Ember.makeArray;

function ServiceInitializer (container, app, options) {
    options = options || {};

    this.app            = app;
    this.container      = container;
    this.locales        = app.locales || options.locales;
    this.defaultLocale = app.defaultLocale || options.defaultLocale;
}

ServiceInitializer.prototype = {
    constructor: ServiceInitializer,

    init: function () {
        var app           = this.app;
        var ServiceKlass  = app.IntlService || IntlService;
        var service       = ServiceKlass.create({ container: this.container });
        var locales       = makeArray(this.locales);

        Ember.assert('Locales has not been configured.  You must define a locale on your app.', locales || this.defaultLocale);

        service.setProperties({
            locales:       locales,
            defaultLocale: this.defaultLocale
        });

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

        return service;
    }
};

export default {
    name: 'ember-intl',

    initialize: function (container, app) {
        var seen = requirejs._eak_seen;
        var prefix = app.modulePrefix;

        // this isn't pretty..
        Object.keys(seen).filter(function (key) {
            return key.indexOf(prefix + '\/cldrs\/') === 0 || key.indexOf(prefix + '\/locales\/') === 0;
        }).forEach(function (key) {
            var isLocale    = key.indexOf(prefix + '\/locales\/') === 0;
            var factoryType = isLocale ? 'locale' : 'cldr';
            var obj         = require(key, null, null, true);
            var moduleName  = key.substr(key.lastIndexOf('/') + 1);

            container.register(factoryType + ':' + moduleName, obj, { instantiate: false });

            // only register the CLDR data
            if (!isLocale) {
                addLocaleData(obj['default']);
            }
        });

        var initializer = new ServiceInitializer(container, app, {
            locales:       app.locales,
            defaultLocale: app.defaultLocale
        });

        initializer.init();
    }
}
