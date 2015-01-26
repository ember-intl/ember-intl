/**
* Copyright 2014, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

import Ember from 'ember';

export default Ember.HTMLBars.makeBoundHelper(function (params/*, hash, options, env*/) {
	params = params || [];

	var intl = this.container.lookup('intl:main');

	Ember.assert('You must pass in a message key in the form of a string.', typeof params[0] === 'string');

	return intl.get('messages.' + params[0]);
});