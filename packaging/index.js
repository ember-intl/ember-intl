#!/usr/bin/env node

/* jshint node: true */

var RSVP    = require('rsvp');
var run     = require('./promise-spawn');
var program = require('commander');

program
		.version(require('../package.json').version)
		.option('-l, --locales', 'Build locale data')
		.option('-b, --build', 'Broccoli build')
		.parse(process.argv);

var promises = [];

if (program.locales) {
		promises.push(run("grunt", [], {cwd: __dirname}));
}

if (program.build) {
		promises.push(run("rm", ["-rf", "dist"], {cwd: __dirname}).then(function(){
				return run("broccoli", ["build", "dist"], {cwd: __dirname});
		}));
}

return RSVP.all(promises);
