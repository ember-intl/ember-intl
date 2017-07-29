import { getOwner } from '@ember/application';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('ember-intl@adapter:default', 'Unit | Adapter | default', {
  beforeEach() {
    this.adapter = this.subject();
  }
});

test('localeFactory can instantiate custom translation models', function(assert) {
  const klass = EmberObject.extend({ customType: true });

  this.register('model:ember-intl-translation', klass);
  let model = this.adapter.localeFactory('en-us');

  assert.ok(klass.detectInstance(model), 'is an instance of the registered type');
  assert.ok(getOwner(model), 'has an owner assigned');
});
