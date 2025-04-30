const { join } = require('path');
const pluginTester = require('babel-plugin-tester').pluginTester;
const formatMessageReplacePlugin = require('../../../lib/babel/format-message-replace-strings');

pluginTester({
	plugin: formatMessageReplacePlugin,
	pluginOptions: {
		idInterpolationPattern: '[sha512:contenthash:base64:6]',
		preserveWhitespace: false,
	},
	pluginName: 'format message replace',
	fixtures: join(__dirname, 'fixtures'),
	babelOptions: {
		plugins: ['@babel/plugin-transform-typescript'],
	},
});
