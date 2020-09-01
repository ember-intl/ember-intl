import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

import './intl-polyfills';

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
