import EmberRouter from '@embroider/router';
import config from 'my-v1-app-with-namespace-from-folders/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Add routes here
});
