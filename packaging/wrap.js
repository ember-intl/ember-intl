/* jshint node: true */

'use strict';

var Filter         = require('broccoli-filter');
var path           = require('path');
var fs             = require('fs');
var relativeFormat = path.dirname(require.resolve('intl-relativeformat'));
var messageFormat  = path.dirname(require.resolve('intl-messageformat'));

function WrapFilter (inputTree) {
    if (!(this instanceof WrapFilter)) {
        return new WrapFilter(inputTree);
    }

    Filter.call(this, inputTree);
    this.extensions = ['js'];
}

module.exports = WrapFilter;
WrapFilter.prototype = Object.create(Filter.prototype);
WrapFilter.prototype.constructor = WrapFilter;

WrapFilter.prototype.processString = function (inputString) {
    // removes all references to window.IntlMessageFormat and IntlRelativeFormat
    // and assigns them both to variables `varName`: messageformat and relativeformat
    // this is all so that we create a closure for relative format and message format
    // instead of depending on the globals.
    var deglobalize = [
        {
            pkgName: 'intl-relativeformat',
            exports: 'IntlRelativeFormat'
        },
        {
            pkgName: 'intl-messageformat',
            exports: 'IntlMessageFormat'
        }
    ].map(function (pkg) {
        var pkgName     = pkg.pkgName;
        var root        = path.dirname(require.resolve(pkgName));
        var fileContent = fs.readFileSync(path.join(root, 'dist', pkgName + '.js'), 'utf8');
        var varName     = pkgName.replace(/intl-/, '');

        inputString = inputString.replace(new RegExp('window\.' + pkg.exports, 'g'), varName);

        // knock off the sourcemap and the portion where the the module
        // is setting itself as a global on `window`
        fileContent = fileContent
          .replace(/\r?\n?[^\r\n]*$/, '')
          .replace(new RegExp('this\\[\'' + pkg.exports + '\'\\] = '), 'return ');

        return 'var ' + varName + ' = ' + fileContent;
    });

    var globalizeIntl = deglobalize.concat([
        'window.EmberIntl = window.EmberIntl || {};',
        'window.EmberIntl.__addLocaleData = function (obj) {',
        '    require("ember-intl")["addLocaleData"](obj)',
        '};'
    ]).join('\n');

    return '(function(){;\n' + inputString + '\n' + globalizeIntl + '})();';
};
