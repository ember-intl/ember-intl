/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

function createIntlBlock (container) {
    return function(template, serviceContext) {
        var service = container.lookup('service:intl');

        if (typeof serviceContext === 'object') {
            Ember.run(function () {
                service.setProperties(serviceContext);
            });
        }

        return Ember.View.create({
            template: Ember.HTMLBars.compile(template),
            container: container,
            context: {}
        });
    };
}

export default createIntlBlock;
