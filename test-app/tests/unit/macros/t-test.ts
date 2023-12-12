import { setOwner } from '@ember/application';
import EmberObject from '@ember/object';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { raw, t } from 'ember-intl/macros';
import { addTranslations, setLocale, setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

class ContainerObject extends EmberObject {}

interface TestContext extends BaseTestContext {
  emberObject: EmberObject;
}

module('Unit | Macro | t', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'Hello',
    'with.interpolations': 'Clicks: {clicks}',
    'with.two.interpolations': 'Coordinates: {x}, {y}',
  });

  hooks.beforeEach(function (this: TestContext) {
    this.emberObject = ContainerObject.extend({
      numberClicks: 9,
      yCoord: 4,

      output1: t('no.interpolations'),

      output2: t('with.interpolations', {
        clicks: 'numberClicks',
      }),

      output3: t('with.two.interpolations', {
        x: raw(10),
        y: 'yCoord',
      }),
    }).create();

    setOwner(this.emberObject, this.owner);
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(this.emberObject.get('output1'), 'Hello');
    assert.strictEqual(this.emberObject.get('output2'), 'Clicks: 9');
    assert.strictEqual(this.emberObject.get('output3'), 'Coordinates: 10, 4');
  });

  test('updates when a dependency key changes value', function (this: TestContext, assert) {
    this.emberObject.set('numberClicks', 15);
    this.emberObject.set('yCoord', -15);

    assert.strictEqual(this.emberObject.get('output1'), 'Hello');
    assert.strictEqual(this.emberObject.get('output2'), 'Clicks: 15');
    assert.strictEqual(this.emberObject.get('output3'), 'Coordinates: 10, -15');
  });

  test('updates when the locale changes', async function (this: TestContext, assert) {
    await addTranslations('es', {
      'no.interpolations': 'Hola',
    });

    await setLocale(['es']);

    assert.strictEqual(this.emberObject.get('output1'), 'Hola');

    assert.strictEqual(
      this.emberObject.get('output2'),
      't:with.interpolations:("clicks":9)',
    );

    assert.strictEqual(
      this.emberObject.get('output3'),
      't:with.two.interpolations:("x":10,"y":4)',
    );
  });
});
