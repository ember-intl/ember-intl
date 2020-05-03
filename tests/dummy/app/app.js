import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-relativetimeformat/dist/locale-data/fr';
import '@formatjs/intl-relativetimeformat/dist/locale-data/es';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  customEvents: {
    mousewheel: null,
    touchstart: null,
    touchmove: null,
  },
});

loadInitializers(App, config.modulePrefix);

export default App;
