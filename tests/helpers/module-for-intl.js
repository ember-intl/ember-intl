import Ember from 'ember';
import IntlService from '../../service/intl';
import { runDestroy } from '../helpers/run-append';

export default function (name, callbacks) {
    callbacks = callbacks || {};

    var container;

    QUnit.module(name, {
        setup: function () {
            Ember.lookup = this.lookup = { Ember: Ember };

            container = this.container = new Ember.Container();

            this.intlBlock = function (templateString, serviceContext, viewContext) {
                var service;

                serviceContext = serviceContext || {};

                if (!container.has('intl:main')) {
                    service = IntlService.create(Ember.$.extend({
                        container:      this.container,
                        locales:        ['en'],
                        defaultLocales: ['en']
                    }, serviceContext));

                    container.register('intl:main', service, {
                        singleton:   true,
                        instantiate: false
                    });
                } else {
                    service = container.lookup('intl:main');
                    Ember.run(function () {
                        service.setProperties(serviceContext);
                    });
                }

                this.service = service;

                container.injection('ember-intl@formatter', 'intl', 'intl:main');

                // mock the component lookup service since it's invoked prior to
                // looking up a handlebar helper to determine if the helper
                // is a valid component.
                container.register('component-lookup:main', Ember.Object.extend({
                    lookupFactory: function () { return false; }
                }));

                return Ember.View.create({
                    container: container,
                    template:  Ember.HTMLBars.compile(templateString),
                    context:   viewContext || {}
                });
            };

            if (callbacks.setup) {
                callbacks.setup(container);
            }
        },
        teardown: function () {
            runDestroy(container);

            if (callbacks.teardown) {
                callbacks.teardown(container);
            }
        }
    });
}
