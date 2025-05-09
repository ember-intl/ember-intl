import Engine from '@ember/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import config from './config/environment';

const { modulePrefix } = config;

export default class MyV1Engine extends Engine {
  dependencies = {
    services: ['intl'],
  };
  modulePrefix = modulePrefix;
  Resolver = Resolver;
}

loadInitializers(MyV1Engine, modulePrefix);
