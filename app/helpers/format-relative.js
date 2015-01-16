import helperBase from 'ember-intl/helpers/base';

var formatOptions = ['style', 'units'];

export default helperBase(formatOptions, function (intl, inputValue, options, hash) {
	return intl.formatRelative(inputValue, options);
});