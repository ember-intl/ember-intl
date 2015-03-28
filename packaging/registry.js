/* jshint node: true */

'use strict';

var Writer  = require('broccoli-writer');
var fs      = require('fs');
var path    = require('path');
var Promise = require('rsvp').Promise;
var walk    = require('walk-sync');

function listDirectories (srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

var AddonRegistry = function (inputTree, options) {
    if (!options) {
        options = {};
    }

    if (!( this instanceof AddonRegistry)) {
        return new AddonRegistry(inputTree, options);
    }

    this.outputPrefix = 'app';
    this.inputTree    = inputTree;
    this.topLevels    = options.topLevels || listDirectories(path.resolve(__dirname, '..', 'app'));
};

AddonRegistry.prototype = Object.create(Writer.prototype);
AddonRegistry.prototype.constructor = AddonRegistry;

AddonRegistry.prototype.write = function (readTree, destDir) {
    var self = this;

    return new Promise(function(resolve) {
        readTree(self.inputTree).then(function (srcDir) {
            var files = walk(srcDir).filter(function(f){return /\.js$/.test(f);});
            var output = ["define('ember-intl-shim', [\"exports\"], function(__exports__) {__exports__.initialize = function(container){"];

            files.forEach(function(filename) {
                var parts = filename.split(path.sep);

                if (self.topLevels.indexOf(parts[0]) !== -1) {
                    var key = parts[0].replace(/s$/, '') + ':' + parts.slice(1).join(path.sep).replace(path.extname(filename), '');
                    var module = [self.outputPrefix].concat(parts).join(path.sep).replace(path.extname(filename), '');
                    output.push("  container.register('" + key + "', require('" + module + "')['default']);" );
                }
            });
            
            output.push("  container.register('ember-intl@model:locale', require('ember-intl/models/translation')['default'])");

            output.push("};});");

            fs.writeFile(path.join(destDir, 'registry-output.js'), output.join("\n"), function (err) {
              if (err) { return reject(err); }
              resolve();
            });
        });
    });
};

module.exports = AddonRegistry;
