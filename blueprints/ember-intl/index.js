/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

module.exports = {
    description: 'Setup ember-intl',

    normalizeEntityName: function () {},

    afterInstall: function() {
        var log = console.log;

        if (this.ui && this.ui.writeLine) {
            log = this.ui.writeLine;
        }

        log(
            '[ember-intl] Don\'t forget to setup your application-wide locale.  ' +
            'The value of this is typically based on a user preference.  ' +
            'Documentation: https://github.com/yahoo/ember-intl#configure-application-wide-locale'
        );
  }
};
