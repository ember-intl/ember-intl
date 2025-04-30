const { join } = require('path');
const pluginTester = require('babel-plugin-tester').pluginTester;
const plugin = require('../../../lib/babel/format-message-import-to-t');

pluginTester({
	plugin,
	pluginOptions: {
		idInterpolationPattern: '[sha512:contenthash:base64:6]',
		preserveWhitespace: false,
	},
	pluginName: 'formatMessage to import t',
	fixtures: join(__dirname, 'fixtures'),
});
