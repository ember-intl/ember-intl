import Application from '@ember/application';
import config from 'dummy/config/environment';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';

import './intl-polyfills';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
