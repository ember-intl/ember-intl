'use strict';

var path = require('path');
var existsSync = require('exists-sync');

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

module.exports = {
  description: 'Setup ember-intl',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    this.ui.writeLine(
      '[ember-intl] Don\'t forget to setup your application-wide locale.  ' +
      'Documentation: https://github.com/jasonmit/ember-intl#setting-runtime-locale'
    );

    if (existsSync(filepath)) {
      try {
        var filepath = path.join(options.project.root, '.template-lintrc.js');
        var lintrc = require(filepath);

        if (lintrc.rules && lintrc.rules['bare-strings'] === false) {
          this.ui.writeLine('[ember-intl] bare-strings in .template-lintrc is recommended to be set to true');
        } else {
          return this.insertIntoFile('.template-lintrc.js', '\n    \'bare-strings\': true', {
            after: 'rules: {'
          });
        }
      } catch(ex) {
        this.ui.writeLine('Error while attempt to set `bare-strings: true` in .template-lintrc.js');
      }
    }
  }
};
