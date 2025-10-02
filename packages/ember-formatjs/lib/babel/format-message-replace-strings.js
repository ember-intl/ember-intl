const { declare } = require('@babel/helper-plugin-utils');
const { interpolateName } = require('@formatjs/ts-transformer');
const defaults = require('./defaults');

const getVariableValue = (args, variable, preserveWhitespace) => {
	const property = args?.properties?.find?.((p) => p.key?.name === variable);
	const propertyValue = property?.value;

	let value = propertyValue?.value;
	if (propertyValue?.type === 'TemplateLiteral') {
		// For a string type TemplateLiteral we only take first quasi
		// because dynamic expressions / concatenation inside a message are not allowed anyways.
		value = propertyValue.quasis[0].value.cooked;
	}

	// Replicates what formatjs does by default
	// Formatjs has an option 'preserveWhitespace' which is `false` by default
	// We need to replicate this to also make certain strings equal regardless of their format.
	// See `messageWithBackticks` and `messageWithMultilineBackticks` inside ../node-tests/fixtures/format-message-replace/output
	if (!preserveWhitespace) {
		return value?.trim().replace(/\s+/gm, ' ');
	}
	return value;
};

/**
 * This plugin is specifically for updating the version of formatMessage from the intl service.
 *
 * e.g.: this.intl.formatMessage(...)
 */
module.exports = declare((api, pluginOptions) => {
	const options = Object.assign({}, defaults, pluginOptions);

	const preserveWhitespace = options.preserveWhitespace;
	const idInterpolationPattern = options.idInterpolationPattern;

	return {
		name: 'ember-intl/formatjs/format-message-replace',

		visitor: {
			CallExpression(path) {
				if (
					(path.node?.callee?.object?.name === 'intl' || // intl.formatMessage()
						path.node?.callee?.object?.property?.name === 'intl') && // <obj>.intl.formatMessage()
					path.node?.callee?.property?.name === 'formatMessage'
				) {
					path.node.callee.property.name = 't';

					const args = path.node?.arguments;
					const firstHash = args?.[0];
					const valuesHash = args?.[1];
					const defaultMessage = getVariableValue(firstHash, 'defaultMessage', preserveWhitespace);
					const description = getVariableValue(firstHash, 'description', true);
					const translationId = getVariableValue(firstHash, 'id', false);

					const id = interpolateName(
						{
							resourcePath: api.File.path,
						},
						idInterpolationPattern,
						{
							content: description ? `${defaultMessage}#${description}` : defaultMessage,
						},
					);

					path.node.arguments[0] = {
						type: 'StringLiteral',
						value: translationId || id,
					};

					path.node.arguments[1] = valuesHash;
					path.node.arguments[2] = null;
				}
			},
		},
	};
});
