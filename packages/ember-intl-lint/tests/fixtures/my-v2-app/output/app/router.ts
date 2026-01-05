import EmberRouter from '@embroider/router';
import config from 'my-v2-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('form');
  this.route('product-details', { path: '/product-details/:id' });
  this.route('products', function () {
    this.route('product', { path: '/:id' });
  });
});
