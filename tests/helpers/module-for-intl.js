import Ember from 'ember';
import IntlService from '../../services/intl';
import { runDestroy } from '../helpers/run-append';

export default function (name, tester) {
    tester = tester || {};

    QUnit.module(name, {
        intlBlock: function (templateString, serviceContext, viewContext) {
            var service   = this.service;
            var container = this.container;

            if (typeof serviceContext === 'object') {
                Ember.run(function () {
                    service.setProperties(serviceContext);
                });
            }

            container.injection('formatter', 'intl', 'service:intl');

            // mock the component lookup service since it's invoked prior to
            // looking up a handlebar helper to determine if the helper
            // is a valid component.
            container.register('component-lookup:main', Ember.Object.extend({
                lookupFactory: function () { return false; }
            }));

            return Ember.View.create({
                intl:      service,
                container: container,
                template:  Ember.HTMLBars.compile(templateString),
                context:   viewContext || {}
            });
        },

        beforeEach: function () {
            var self = this;

            Ember.lookup = this.lookup = { Ember: Ember };

            this.container = tester.container = new Ember.Container();
            this.service = this.getService(this.container);

            if (tester.beforeEach) {
                tester.beforeEach(this.container);
            }
        },

        afterEach: function () {
            runDestroy(this.container);

            if (tester.afterEach) {
                tester.afterEach(this.container);
            }
        },

        getService: function () {
            var container = this.container;

            if (!container.has('service:intl')) {
                var service = IntlService.create(Ember.$.extend({}, {
                    container:     this.container,
                    locales:       ['en'],
                    defaultLocale: 'en'
                }));

                container.register('service:intl', service, {
                    singleton:   true,
                    instantiate: false
                });

                return service;
            }

            return container.lookup('service:intl');
        }
    });
}
