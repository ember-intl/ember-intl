import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  rootURL: config.rootURL,
  location: config.locationType
});

Router.map(function() {
  this.route('smoke');
});

export default Router;
