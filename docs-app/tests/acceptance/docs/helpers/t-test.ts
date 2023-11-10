import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | docs | helpers | t', function (hooks) {
  setupApplicationTest(hooks);

  test('We can interact with the example for ICU Message Syntax', async function (assert) {
    await visit('/docs/helpers/t');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: You have no photos.');

    await click('[data-test-button="Add photo"]');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: You have one photo.');

    await click('[data-test-button="Add photo"]');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: You have 2 photos.');

    await click('[data-test-button="de-de"]');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: Du hast 2 Fotos.');

    await click('[data-test-button="Delete photo"]');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: Du hast ein Foto.');

    await click('[data-test-button="Delete photo"]');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: Du hast keine Fotos.');

    await click('[data-test-button="Delete photo"]');

    assert
      .dom('[data-test-field="Message"]')
      .hasText('Message: Du hast keine Fotos.');
  });
});
