import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix:    config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver:        Resolver,
      ready: function () {
        // setup default values
        this.intl.setProperties({
            locales:       ['en-US'],
            defaultLocale: 'en-US'
        });
    }
});

loadInitializers(App, config.modulePrefix);

export default App;
