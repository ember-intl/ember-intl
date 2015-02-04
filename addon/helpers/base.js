/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { Stream, read } from '../utils/streams';

var SimpleBoundView = Ember._SimpleHandlebarsView || Ember._SimpleBoundView;

function destroyStream (stream) {
    if (stream && !stream.destroyed) {
        stream.destroy();
    }
}

export default function (formatterName) {
    function throwError () {
        return new Error(formatterName + ' requires a single unname argument. {{' + formatterName + ' value}}');
    }

    if (Ember.HTMLBars) {
        return Ember.HTMLBars.makeBoundHelper(function (params, hash, options, env) {
            var formatter = this.container.lookup('formatter:' + formatterName);

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
        return function (value, options) {
            if (typeof value === 'undefined') {
                return throwError();
            }

            var args      = Ember.A();
            var streams   = Ember.A();
            var view      = options.data.view;
            var types     = options.types;
            var hash      = Ember.$.extend({}, options.hash);
            var formatter = view.container.lookup('formatter:' + formatterName);
            var stream;

            function rerenderView () {
                Ember.run.scheduleOnce('render', view, view.rerender);
            }

            args.push(hash);
            args.push(this);

            if (types[0] === 'ID') {
                value = view.getStream(value);
            }

            stream = new Stream(function () {
                var currentValue = value;

                if (currentValue.isStream) {
                    currentValue = read(currentValue);
                }

                return formatter.format.apply(formatter, [currentValue].concat(args));
            });

            var simpleView = new SimpleBoundView(stream, options.escaped);

            Ember.keys(options.hashTypes).forEach(function (key) {
                if (options.hashTypes[key] === 'ID') {
                    var hashStream = view.getStream(options.hash[key]);
                    hash[key] = read(hashStream);

                    if (!options.data.isUnbound) {
                        hashStream.subscribe(function () {
                            // update the hash with the new value
                            // since the above stream closes over `hash`
                            // within `args`
                            hash[key] = read(hashStream);
                            stream.notify();
                        });

                        streams.push(hashStream);
                    }
                }
            });

            if (!options.data.isUnbound) {
                stream.subscribe(view._wrapAsScheduled(function () {
                    Ember.run.scheduleOnce('render', simpleView, 'rerender');
                }));

                if (value.isStream) {
                    value.subscribe(stream.notify, stream);
                    streams.push(value);
                }

                formatter.intl.one('localesChanged', rerenderView);
            }

            view.on('willDestroyElement', function () {
                streams.forEach(destroyStream);
                streams = [];
                formatter.intl.off('localesChanged', rerenderView);
            });

            view.appendChild(simpleView);
        };
    }
}