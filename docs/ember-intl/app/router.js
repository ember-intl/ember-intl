import config from 'docs-app-for-ember-intl/config/environment';
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Add route declarations here
  docsRoute(this, function () {
    this.route('advanced', function () {
      this.route('addon-support');
    });

    this.route('getting-started', { path: '/' }, function () {
      this.route('quickstart');
      this.route('quickstart-addons');
      this.route('runtime-requirements');
    });

    this.route('guide', function () {
      this.route('addon-configs');
      this.route('asynchronously-loading-translations');
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
      this.route('format-time');
      this.route('t');
    });

    this.route('integrations', function () {
      this.route('ember-cp-validations');
      this.route('visual-studio-code');
    });

    this.route('migration', function () {
      this.route('v2');
      this.route('v3');
      this.route('v4');
      this.route('v5');
      this.route('v6');
    });
  });

  this.route('not-found', { path: '*' });
});
