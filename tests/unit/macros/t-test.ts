import { setOwner } from '@ember/application';
import { module, test, todo } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { setupIntl, addTranslations, TestContext as BaseTextContext } from 'ember-intl/test-support';

import { t, raw } from 'ember-intl';

interface TestContext extends BaseTextContext {
  ContainerObject: typeof EmberObject;
  object: EmberObject & {
    numberClicks: number;
    tMacroProperty1: ReturnType<typeof t>;
    tMacroProperty2: ReturnType<typeof t>;
  };
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
    assert.equal(this.object.get('tMacroProperty1'), 'text with no interpolations');
  });

  test('defines a computed property that translates with interpolations', function (this: TestContext, assert) {
    assert.equal(this.object.get('tMacroProperty2'), 'Clicks: 9');
  });

  todo('allows property to be overridden', function (this: TestContext, assert) {
    this.object.set('tMacroProperty2', 'A new value');
    assert.equal(this.object.get('tMacroProperty2'), 'A new value');
  });

  test('defines a computed property with dependencies', function (this: TestContext, assert) {
    run(this.object, 'set', 'numberClicks', 13);
    assert.equal(this.object.get('tMacroProperty2'), 'Clicks: 13');
  });

  test('defines a computed property that depends on the locale', function (this: TestContext, assert) {
    addTranslations('es', {
      'no.interpolations': 'texto sin interpolaciones',
    });

    assert.equal(this.object.get('tMacroProperty1'), 'text with no interpolations');
    run(() => this.intl.setLocale(['es']));
    assert.equal(this.object.get('tMacroProperty1'), 'texto sin interpolaciones');
  });

  test('defines a computed property that accepts static and dynamic values', function (this: TestContext, assert) {
    const object = this.ContainerObject.extend({
      yCoord: 4,
      macroProperty: t('with.two.interpolations', { x: raw(10), y: 'yCoord' }),
    }).create();
    assert.equal(object.get('macroProperty'), 'Coordinates: 10, 4');
    run(object, 'set', 'yCoord', 13);
    assert.equal(object.get('macroProperty'), 'Coordinates: 10, 13');
  });

  test('looks up the intl service through the owner, if it is not injected, and still watches locale changes', function (this: TestContext, assert) {
    addTranslations('es', {
      'no.interpolations': 'texto sin interpolaciones',
    });

    const object = EmberObject.extend({
      macroProperty: t('no.interpolations'),
    }).create();

    setOwner(object, {
      lookup: (name: string) => {
        assert.strictEqual(name, 'service:intl', 'looks up the service through the owner');
        return this.intl;
      },
    });

    assert.strictEqual(object.get('macroProperty'), 'text with no interpolations', 'translates the text');

    run(() => this.intl.setLocale(['es']));

    assert.strictEqual(object.get('macroProperty'), 'texto sin interpolaciones', 'updates, when the locale changes');
  });
});
