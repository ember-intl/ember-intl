import Engine from '@ember/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import config from './config/environment';

const { modulePrefix } = config;

export default class MyV1Engine extends Engine {
  modulePrefix = modulePrefix;
  Resolver = Resolver;

  dependencies = {
    services: ['intl'],
  };
}

loadInitializers(MyV1Engine, modulePrefix);
