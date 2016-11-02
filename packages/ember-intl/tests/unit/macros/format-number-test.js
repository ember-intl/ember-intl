import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { formatNumber, raw, ref } from 'ember-intl/macros';

moduleFor('service:intl', 'Unit | Macro | formatNumber', {
  integration: true,
  beforeEach() {
    let intl = this.subject();
    intl.setLocale('en');

    this.object = Ember.Object.extend({
      intl,
      someNumber: 12345,
      fractionDigits: 3,
      formattedNumber: formatNumber('someNumber'),
      rawFormattedNumber: formatNumber(raw(10001)),
      withFraction: formatNumber('someNumber', {
        minimumFractionDigits: 2,
      }),
      withDynamicFraction: formatNumber('someNumber', {
        minimumFractionDigits: ref('fractionDigits'),
      }),
    }).create();
  }
});

test('defines a computed property that formats a number', function(assert) {
  assert.equal(this.object.get('formattedNumber'), '12,345');
});

test('defines a computed property that formats a raw number', function(assert) {
  assert.equal(this.object.get('rawFormattedNumber'), '10,001');
});

test('defines a computed property that formats a number with static options', function(assert) {
  assert.equal(this.object.get('withFraction'), '12,345.00');
});

test('defines a computed property that formats a number with dynamic options', function(assert) {
  assert.equal(this.object.get('withDynamicFraction'), '12,345.000');
  Ember.run(() => this.object.set('fractionDigits', 1));
  assert.equal(this.object.get('withDynamicFraction'), '12,345.0');
});

test('defines a computed property with dependencies', function(assert) {
  Ember.run(() => this.object.set('someNumber', 42));
  assert.equal(this.object.get('formattedNumber'), '42');
});

test('defines a computed property that depends on the locale', function(assert) {
  assert.equal(this.object.get('formattedNumber'), '12,345');
  Ember.run(() => this.subject().setLocale('es'));
  assert.equal(this.object.get('formattedNumber'), '12.345');
});
