import { visit } from '@ember/test-helpers';
import { setLocale } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'test-app-for-ember-intl/tests/helpers';

module('Acceptance | smoke-tests', function (hooks) {
  setupApplicationTest(hooks);

  module('de-de', function () {
    test('We can see translations', async function (assert) {
      await visit('/smoke-tests');
      await setLocale('de-de');

      assert
        .dom('[data-test-field="Format Number"]')
        .includesText('1.000,00', '{{format-number}} works.');

      assert
        .dom('[data-test-field="Format Date"]')
        .hasText('23.1.2014', '{{format-date}} works.');

      assert
        .dom('[data-test-field="Format Date Range"]')
        .hasText('23.–26.01.2014', '{{format-date-range}} works.');

      assert
        .dom('[data-test-field="Format Time"]')
        .hasText('18:00:44', '{{format-time}} works.');

      assert
        .dom('[data-test-field="Format Relative Time"]')
        .hasText('in 1 Tag', '{{format-relative-time}} works.');

      assert
        .dom('[data-test-field="Nested Translations"]')
        .hasText('Hallo Welt!', 'Nested translations work.');
    });
  });

  module('en-us', function () {
    test('We can see translations', async function (assert) {
      await visit('/smoke-tests');

      assert
        .dom('[data-test-field="Format Number"]')
        .hasText('€1,000.00', '{{format-number}} works.');

      assert
        .dom('[data-test-field="Format Date"]')
        .hasText('1/23/2014', '{{format-date}} works.');

      assert
        .dom('[data-test-field="Format Date Range"]')
        .hasText(/1\/23\/2014\s–\s1\/26\/2014/, '{{format-date-range}} works.');

      assert
        .dom('[data-test-field="Format Time"]')
        .hasText('18:00:44', '{{format-time}} works.');

      assert
        .dom('[data-test-field="Format Relative Time"]')
        .hasText('in 1 day', '{{format-relative-time}} works.');

      assert
        .dom('[data-test-field="Nested Translations"]')
        .hasText('Hello world!', 'Nested translations work.');
    });
  });
});
