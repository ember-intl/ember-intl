import EmberRouter from '@ember/routing/router';
import config from 'test-app-for-ember-intl/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('smoke-tests');
});
