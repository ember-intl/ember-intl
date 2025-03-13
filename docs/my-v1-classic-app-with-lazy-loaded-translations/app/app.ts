import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'my-v1-classic-app-with-lazy-loaded-translations/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  engines = {
    'my-v1-engine': {
      dependencies: {
        services: [
          {
            'external-router': 'router',
          },
          'intl',
        ],
      },
    },
  };
}

loadInitializers(App, config.modulePrefix);
