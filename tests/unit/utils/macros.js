import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { translationMacro as t } from 'ember-intl';

let service;

moduleFor('service:intl', 'Unit | Macrol', {
  integration: true,
  beforeEach() {
    const intl = this.subject();
    intl.setLocale('en');
    service = intl;

    this.object = Ember.Object.extend({
      intl: intl,
      numberClicks: 9,
      tMacroProperty1: t('no.interpolations'),
      tMacroProperty2: t('with.interpolations', { clicks: 'numberClicks' }),
    }).create();
  }
});

test('defines a computed property that translates without interpolations', function(assert) {
  assert.equal(this.object.get('tMacroProperty1'), 'text with no interpolations');
});

test('defines a computed property that translates with interpolations', function(assert) {
  assert.equal(this.object.get('tMacroProperty2'), 'Clicks: 9');
});

test('defines a computed property with dependencies', function(assert) {
  Ember.run(this.object, 'set', 'numberClicks', 13);
  assert.equal(this.object.get('tMacroProperty2'), 'Clicks: 13');
});

test('defines a computed property that depends on the locale', function(assert) {
  assert.equal(this.object.get('tMacroProperty1'), 'text with no interpolations');
  Ember.run(this.object, 'set', 'i18n.locale', 'es');
  assert.equal(this.object.get('tMacroProperty1'), 'texto sin interpolaciones');
});
