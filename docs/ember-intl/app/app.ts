import Application from '@ember/application';
import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import config from 'docs-app-for-ember-intl/config/environment';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

export default class App extends Application {
  inspector = setupInspector(this);
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
