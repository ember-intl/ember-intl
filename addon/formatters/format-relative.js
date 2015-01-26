/**
* Copyright 2014, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

import Ember from 'ember';
import Formatter from '../formatter-base';

var FormatRelative = Formatter.extend({
	render: function (params, hash, options, env) {
		var formatOptions = {
			formats: hash.format || this.filterFormatOptions()
		};

		if (hash.locales) {
			formatOptions.locales = hash.locales;
		}

		return this.intl.formatRelative(params[0], formatOptions);
	}
});

FormatRelative.reopenClass({
	formatOptions: ['style', 'units']
});

export default FormatRelative;
