/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

export default function (formatterName) {
    function throwError () {
        return new Error(formatterName + ' requires a single unname argument. {{' + formatterName + ' value}}');
    }

    if (Ember.HTMLBars) {
        return Ember.HTMLBars.makeBoundHelper(function (params, hash, options, env) {
            var formatter = this.container.lookup('ember-intl@formatter:' + formatterName);

            formatter.intl.one('localesChanged', this, function () {
                Ember.run.once(this, this.rerender);
            });

            if (!params || (params && !params.length)) {
                return throwError();
            }

            var args = [];
            args.push(params[0]);
            args.push(hash);
            args.push(Ember.get(env, 'data.view.context'));

            return formatter.format.apply(formatter, args);
        });
    } else {
        return Ember.Handlebars.makeBoundHelper(function (value, options) {
            var formatter = this.container.lookup('ember-intl@formatter:' + formatterName);

            formatter.intl.one('localesChanged', this, function () {
                Ember.run.once(this, this.rerender);
            });

            if (typeof value === 'undefined') {
                return throwError();
            }

            var args = [];
            args.push(value);
            args.push(options.hash);

            var context = this;

            if (options.contexts && options.contexts[0]) {
              context = options.contexts[0];
            }

            args.push(context);

            return formatter.format.apply(formatter, args);
        });
    }
}
