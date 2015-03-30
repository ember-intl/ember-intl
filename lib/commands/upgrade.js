var mv      = require('mv');
var path    = require('path');
var glob    = require('glob');
var fs      = require('fs-extra');
var Promise = require('ember-cli/lib/ext/promise');
var move    = Promise.denodeify(fs.move);

module.exports = {
    name:        'intl:upgrade',
    description: 'automated ember-intl upgrade from 1.0 to 2.0',
    works:       'insideProject',

    run: function (commandOptions, rawArgs) {
        var outputDir = 'translations';

        return new Promise(function (resolve, reject) {
            return move('app/locales', outputDir, { clobber: false }).then(function () {
                var globResults = glob.sync(outputDir + '/**.js');
                var promises = globResults.map(function (file) {
                    return move(file, path.join(outputDir, path.basename(file, 'js') + 'json'), { mkdirp: true });
                }, this);

                Promise.all(promises).then(resolve);
            });
        });
    }
};
