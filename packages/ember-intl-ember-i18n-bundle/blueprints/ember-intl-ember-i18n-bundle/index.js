'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

module.exports = {
  description: 'Setup ember-i18n core functionality within ember-intl',

  normalizeEntityName: function () {},

  afterInstall: function() {
    this.ui.writeLine(
      '[ember-intl] Don\'t forget to setup your application-wide locale.  ' +
      'Documentation: https://github.com/jasonmit/ember-intl#setting-runtime-locale'
    );

    return this.removePackageFromProject('ember-intl-icu-bundle');
  }
};
