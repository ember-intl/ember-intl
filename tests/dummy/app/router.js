import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('smoke');

  this.route('docs', function() {
    this.route('api', function() {
      this.route('item', { path: '/*path' });
    });
  });
});

export default Router;
