import { module, test } from 'qunit';

import { visit } from '@ember/test-helpers';

import { setupApplicationTest } from 'ember-qunit';

module('Application Translations', function (hooks) {
	setupApplicationTest(hooks);

	test('it works (gts)', async function (assert) {
		await visit('/gts');

		// The translations file is manually edited to provide this text
		assert.dom('h2').hasText(`Translated!!!`, `translated text differs from source text`);
	});

	test('it works (hbs)', async function (assert) {
		await visit('/hbs');

		// The translations file is manually edited to provide this text
		assert.dom('h2').hasText(`Translated!!!`, `translated text differs from source text`);
	});
});
