import Application from '@ember/application';
import config from 'dummy/config/environment';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

export default class App extends Application {
  engines = {
    'my-v1-engine': {
      dependencies: {
        services: ['intl'],
      },
    },
  };
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
