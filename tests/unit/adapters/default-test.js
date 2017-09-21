import { getOwner } from '@ember/application';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('ember-intl@adapter:default', 'Unit | Adapter | default', {});

test('localeFactory can instantiate custom translation models', function(assert) {
  const klass = EmberObject.extend({ customType: true });
  this.register('model:ember-intl-translation', klass);
  this.adapter = this.subject();

  const instance = this.adapter.localeFactory('en-us');
  assert.ok(klass.detectInstance(instance), 'is an instance of the registered type');
  assert.ok(getOwner(instance), 'has an owner assigned');
});
