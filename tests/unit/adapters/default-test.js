import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | default', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.adapter = this.owner.lookup('ember-intl@adapter:default');
  });

  test('localeFactory can instantiate custom translation models', function(assert) {
    const klass = EmberObject.extend({ customType: true });

    this.owner.register('model:ember-intl-translation', klass);
    let model = this.adapter.localeFactory('en-us');

    assert.ok(klass.detectInstance(model), 'is an instance of the registered type');
    assert.ok(this.owner, 'has an owner assigned');
  });
});
