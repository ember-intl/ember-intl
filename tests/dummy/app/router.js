import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from 'dummy/config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    this.route('getting-started', { path: '/' }, function () {
      this.route('quickstart');
      this.route('runtime-requirements');
    });

    this.route('guide', function () {
      this.route('addon-configs');
      this.route('asynchronously-loading-translations');
      this.route('migration-4-0-to-5-0');
      this.route('missing-translations');
      this.route('service-api');
      this.route('testing');
      this.route('translating-text');
    });

    this.route('helpers', function () {
      this.route('format-date');
      this.route('format-list');
      this.route('format-message');
      this.route('format-number');
      this.route('format-relative');
    });
  });
});
