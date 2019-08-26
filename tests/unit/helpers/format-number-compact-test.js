import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatNumberCompactHelper from 'ember-intl/helpers/format-number-compact';

module('format-number-compact', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.set('formats', {
      shortNumber: {
        oneDigit: {
          significantDigits: 1
        }
      }
    });
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatNumberCompactHelper);
  });

  test('invoke the formatMessage method', function(assert) {
    assert.expect(1);
    assert.equal(this.intl.formatMessage('{amount, shortNumber, oneDigit}', { amount: 19634 }), '19.6K');
  });

  test('number is formats unset locale (en-US)', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-number-compact 19634}}`);
    assert.equal(this.element.textContent, '20K');
  });

  test('number is formatted correctly with active service locale', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['es-es']);
    await render(hbs`{{format-number-compact 1000}}`);
    assert.equal(this.element.textContent, '1\xa0mil');
  });

  test('locale can be passed as an argument', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['es-es']);
    this.set('NUM', 1000);
    await render(hbs`{{format-number-compact NUM locale="en-us"}}`);
    assert.equal(this.element.textContent, '1K');
  });

  test('style can be passed as an argument', async function(assert) {
    assert.expect(1);
    this.set('NUM', 19634);
    await render(hbs`{{format-number-compact NUM style="oneDigit"}}`);
    assert.equal(this.element.textContent, '19.6K');
  });
});
