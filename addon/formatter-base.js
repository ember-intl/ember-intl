/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var FormatBase = Ember.Object.extend({
    buildOptions: function (value, hash) {
        var args = [value];

        if (typeof hash.format !== 'undefined') {
            args.push(hash.format);
        }

        var helperOptions = this.filterFormatOptions(hash) || {};

        if (hash.locales) {
            helperOptions.locales = hash.locales;
        }
        
        args.push(helperOptions);

        return args;
    },

    filterFormatOptions: function (hash) {
        hash = hash || {};

        var match = false;

        var options = this.constructor.formatOptions.reduce(function (opts, name) {
            if (hash.hasOwnProperty(name)) {
                match = true;
                opts[name] = hash[name];
            }

            return opts;
        }, {});

        if (match) {
            return options;
        }
    }
});

FormatBase.reopenClass({
    formatOptions: Ember.A()
});

export default FormatBase;
