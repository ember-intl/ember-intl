'use strict';

/**
 * in gjs / gts files, we need to change the formatMessage import to be the t import.
 */
module.exports = function (/* babel, pluginOptions */) {
	//const { types: t } = babel;

	return {
		name: 'ember-intl/formatjs/format-message-import-to-t', // tea,
		visitor: {
			ImportDeclaration(path /*, state */) {
				if (path.node.source.value === 'ember-intl/helpers/format-message') {
					path.node.source.value = 'ember-intl/helpers/t';

					if (path.node.specifiers.length > 1) {
						throw new Error(`Importing additional specifiers from format-message is not allowed`);
					}

					if (path.node.specifiers[0].local.name !== 'formatMessage') {
						throw new Error(`default import may only be "formatMessage"`);
					}
				}
			},
		},
	};
};
