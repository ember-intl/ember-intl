import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from 'dummy/config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  docsRoute(this, function () {});
});
