import { setOwner } from '@ember/application';
import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { raw, t } from 'ember-intl';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-qunit';
import { module, skip, test } from 'qunit';

interface TestContext extends BaseTestContext {
  ContainerObject: typeof EmberObject;
  intl: IntlService;
  object: EmberObject;
}

module('Unit | Macros | t', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'text with no interpolations',
    'with.interpolations': 'Clicks: {clicks}',
    'with.two.interpolations': 'Coordinates: {x}, {y}',
  });

  hooks.beforeEach(function (this: TestContext) {
    const { owner } = this;

    this.ContainerObject = class extends EmberObject {
      constructor() {
        // eslint-disable-next-line prefer-rest-params
        super(...arguments);
        setOwner(this, owner);
      }
    };

    this.object = this.ContainerObject.extend({
      numberClicks: 9,
      tMacroProperty1: t('no.interpolations'),
      tMacroProperty2: t('with.interpolations', { clicks: 'numberClicks' }),
    }).create();
  });

  test('defines a computed property that translates without interpolations', function (this: TestContext, assert) {
    assert.strictEqual(
      this.object.get('tMacroProperty1'),
      'text with no interpolations',
    );
  });

  test('defines a computed property that translates with interpolations', function (this: TestContext, assert) {
    assert.strictEqual(this.object.get('tMacroProperty2'), 'Clicks: 9');
  });

  /*
    FIXME:

    This test, even when marked as a TODO (using `todo` from `@ember/test-helpers`),
    can be picked up by `ember-try` and fail continuous integration.

    According to @buschtoens, the failure may be due to an intentional change upstream
    in Ember.js.

    https://github.com/ember-intl/ember-intl/pull/1634/commits/0a39222961cf446b9c8169805cf8e3f56f51976e

    Consider deleting the test.
  */
  skip('allows property to be overridden', function (this: TestContext, assert) {
    this.object.set('tMacroProperty2', 'A new value');
    assert.strictEqual(this.object.get('tMacroProperty2'), 'A new value');
  });

  test('defines a computed property with dependencies', function (this: TestContext, assert) {
    run(this.object, 'set', 'numberClicks', 13);
    assert.strictEqual(this.object.get('tMacroProperty2'), 'Clicks: 13');
  });

  test('defines a computed property that depends on the locale', function (this: TestContext, assert) {
    addTranslations('es', {
      'no.interpolations': 'texto sin interpolaciones',
    });

    assert.strictEqual(
      this.object.get('tMacroProperty1'),
      'text with no interpolations',
    );
    run(() => this.intl.setLocale(['es']));
    assert.strictEqual(
      this.object.get('tMacroProperty1'),
      'texto sin interpolaciones',
    );
  });

  test('defines a computed property that accepts static and dynamic values', function (this: TestContext, assert) {
    const object = this.ContainerObject.extend({
      yCoord: 4,
      macroProperty: t('with.two.interpolations', { x: raw(10), y: 'yCoord' }),
    }).create();
    assert.strictEqual(object.get('macroProperty'), 'Coordinates: 10, 4');
    run(object, 'set', 'yCoord', 13);
    assert.strictEqual(object.get('macroProperty'), 'Coordinates: 10, 13');
  });

  test('looks up the intl service through the owner, if it is not injected, and still watches locale changes', function (this: TestContext, assert) {
    addTranslations('es', {
      'no.interpolations': 'texto sin interpolaciones',
    });

    // eslint-disable-next-line ember/no-classic-classes
    const object = EmberObject.extend({
      macroProperty: t('no.interpolations'),
    }).create();

    // @ts-expect-error: Argument of type '{ lookup: (name: string) => IntlService; }' is not assignable to parameter of type 'Owner'. Type '{ lookup: (name: string) => IntlService; }' is missing the following properties from type 'Owner': register, factoryFor
    setOwner(object, {
      lookup: (name: string) => {
        assert.strictEqual(
          name,
          'service:intl',
          'looks up the service through the owner',
        );
        return this.intl;
      },
    });

    assert.strictEqual(
      object.get('macroProperty'),
      'text with no interpolations',
      'translates the text',
    );

    run(() => this.intl.setLocale(['es']));

    assert.strictEqual(
      object.get('macroProperty'),
      'texto sin interpolaciones',
      'updates, when the locale changes',
    );
  });
});
