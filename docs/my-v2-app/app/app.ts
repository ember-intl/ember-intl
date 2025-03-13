import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'my-v2-app/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);
