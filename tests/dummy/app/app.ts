import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

import './intl-polyfills';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
  customEvents = {
    mousewheel: null,
    touchstart: null,
    touchmove: null,
  };
}

loadInitializers(App, config.modulePrefix);
