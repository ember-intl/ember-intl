/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

 var VersionChecker = require('ember-cli-version-checker');

function isModern(instance) {
    var checker = new VersionChecker(instance);
    var dep     = checker.for('ember', 'bower');
    return dep.satisfies('>= 1.13.0 || >= 2.0.0-0 || >= 2.1.0-0');
}

module.exports = isModern;
