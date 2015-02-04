/* global define, require */

define('ember', ["exports"], function(__exports__) {
    __exports__['default'] = window.Ember;
});

define('ember-intl', ["exports"], function(__exports__) {
    var lf = require('ember-intl/index');
    Object.keys(lf).forEach(function(key) {
        __exports__[key] = lf[key];
    });
});

window.Ember.Application.initializer({
    name: 'ember-intl-standalone',
    initialize: function(container, app) {
        require('ember-intl-shim').initialize.apply(this, arguments);
        require('app/initializers/ember-intl')['default'].initialize.apply(this, arguments);
    }
});
