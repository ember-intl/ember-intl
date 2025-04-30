'use strict';
/* eslint-env node */

const { interpolateName } = require('@formatjs/ts-transformer');
const defaults = require('./lib/babel/defaults');

/**
 * node.path.original is DEPRECATED in newer versions of @glimmer/syntax
 * '.value' is the new property to use, but it does not exist in older versions
 * of @glimmer/syntax
 *
 * Exact deprecation messages
 *  - [on a StringLiteral] The original property on literal nodes is deprecated, use value instead
 *  - [on a PathExpression] The parts property on path nodes is deprecated, use head and tail instead
 */
function getValue(node) {
	if (!node) {
		return;
	}

	const name = 'value' in node ? node.value : node.original;

	return name;
}

function setValue(node, newValue) {
	if (!node) {
		return;
	}

	if ('value' in node) {
		node.value = newValue;
		return;
	}

	node.original = newValue;
}

const CWD = process.cwd();
const NAME = require(`${CWD}/package.json`).name;
const NOOP = {
	name: 'ember-intl/ember-formatjs/noop-template-plugin',
	visitor: {},
};

/**
 * A template transform operates on all templates.
 * We need to lock our transform down to
 * - templates not in node_modules
 *   - unless template is in .embroider/rewritten-app (old embroider)
 * - templates within our CWD
 *
 * Don't double-transform files.
 * We expect libraries to have built themselves with our translation system.
 *
 * @param {string} fileName
 */
function isRelevant(fileName) {
	if (fileName.startsWith(NAME)) {
		return true;
	}

	const isInOurDirectory = fileName.startsWith(CWD);

	if (!isInOurDirectory) {
		return false;
	}

	const isInNodeModules = fileName.includes('/node_modules/');
	const isOldEmbroider = fileName.includes('.embroider/rewritten-app');

	return !isInNodeModules || isOldEmbroider;
}

function buildTransform(passedOptions) {
	const options = Object.assign({}, defaults, passedOptions);

	return function (env) {
		const fileName = env.meta.moduleName ?? env.moduleName;

		if (!isRelevant(fileName)) {
			return NOOP;
		}

		function transformHelper(node) {
			const name = getValue(node.path);
			if (name === 'format-message' || name === 'formatMessage') {
				/**
				 * defaultMessage and description are trimmed and multiple white spaces are replaced with a single space when generating the ID to ensure white space does not result in a new id
				 */
				const defaultMessage = getValue(node.params[0])?.trim().replace(/\s+/gm, ' ');
				const description = getValue(node.params[1])?.trim().replace(/\s+/gm, ' ');

				const id = interpolateName(
					{
						resourcePath: fileName,
					},
					options.idInterpolationPattern,
					{
						content: description ? `${defaultMessage}#${description}` : defaultMessage,
					},
				);

				// We don't want to change gjs/gts usage
				// instead, we'll import the t helper as formatMessage
				if (name !== 'formatMessage') {
					setValue(node.path, 't');
				}

				// set the hashed value
				node.params[0].value = id;

				// there _may_ be more params, but here we discard all of them except the first
				node.params = [node.params[0]];
			}
		}

		return {
			name: 'ember-intl/ember-formatjs/template-plugin',

			visitor: {
				MustacheStatement: transformHelper,
				SubExpression: transformHelper,
			},
		};
	};
}

module.exports = buildTransform;
