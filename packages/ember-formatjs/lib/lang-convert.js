const Filter = require('broccoli-persistent-filter');

class LangConvert extends Filter {
	constructor(inputNode, search, replace, options = {}) {
		super(inputNode, {
			annotation: options.annotation,
		});
		this.extensions = ['json'];
		this.targetExtension = 'json';
	}

	processString(content) {
		const parsed = JSON.parse(content);

		const result = {};

		for (const key in parsed) {
			result[key] = parsed[key].message;
		}

		return JSON.stringify(result, null, 2);
	}
}

module.exports = LangConvert;
