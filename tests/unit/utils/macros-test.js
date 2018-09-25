import { setOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { setupIntl, addTranslations } from 'ember-intl/test-support';
import { translationMacro as t } from 'ember-intl';

module('Unit | translationMacro', function(hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'text with no interpolations',
    'with.interpolations': 'Clicks: {clicks}'
  });

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');

    this.object = EmberObject.extend({
      intl: this.intl,
      numberClicks: 9,
      tMacroProperty1: t('no.interpolations'),
      tMacroProperty2: t('with.interpolations', { clicks: 'numberClicks' })
    }).create();
  });

  test('defines a computed property that translates without interpolations', function(assert) {
    assert.equal(this.object.get('tMacroProperty1'), 'text with no interpolations');
  });

  test('defines a computed property that translates with interpolations', function(assert) {
    assert.equal(this.object.get('tMacroProperty2'), 'Clicks: 9');
  });

  test('defines a computed property with dependencies', function(assert) {
    run(this.object, 'set', 'numberClicks', 13);
    assert.equal(this.object.get('tMacroProperty2'), 'Clicks: 13');
  });

  test('defines a computed property that depends on the locale', function(assert) {
    addTranslations('es', {
      'no.interpolations': 'texto sin interpolaciones'
    });

    assert.equal(this.object.get('tMacroProperty1'), 'text with no interpolations');
    run(() => this.intl.setLocale('es'));
    assert.equal(this.object.get('tMacroProperty1'), 'texto sin interpolaciones');
  });

  test('looks up the intl service through the owner, if it not injected', function(assert) {
    const object = EmberObject.extend({
      macroProperty: t('no.interpolations')
    }).create();

    setOwner(object, {
      lookup: name => {
        assert.strictEqual(name, 'service:intl');
        return this.intl;
      }
    });

    assert.strictEqual(object.get('macroProperty'), 'text with no interpolations');
  });
});
