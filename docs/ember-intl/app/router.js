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
      this.route('auto-generating-keys');
      this.route('configuration');
      this.route('lazy-loading-translations');
      this.route('organizing-translations');
      this.route('runtime-requirements');
    });

    this.route('getting-started', { path: '/' }, function () {
      this.route('quickstart');
      this.route('quickstart-addons');
    });

    this.route('helpers', function () {
      this.route('format-date');
      this.route('format-date-range');
      this.route('format-list');
      this.route('format-message');
      this.route('format-number');
      this.route('format-relative');
      this.route('format-relative-time');
      this.route('format-time');
      this.route('introduction');
      this.route('t');
      this.route('template-tag');
    });

    this.route('migration', function () {
      this.route('v2');
      this.route('v3');
      this.route('v4');
      this.route('v5');
      this.route('v6');
      this.route('v7');
    });

    this.route('services', function () {
      this.route('intl-part-1');
      this.route('intl-part-2');
      this.route('introduction');
    });

    this.route('test-helpers', function () {
      this.route('add-translations');
      this.route('set-locale');
      this.route('introduction');
      this.route('setup-intl');
      this.route('t');
    });
  });

  this.route('not-found', { path: '*' });
});
