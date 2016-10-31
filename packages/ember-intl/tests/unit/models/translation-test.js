import { moduleFor, test } from 'ember-qunit';

moduleFor('ember-intl@model:translation', 'Unit | Model | translation', {
  integration: true,
  beforeEach() {
    this.model = this.subject();
  }
});

test('can handle deeply nested object passed into addTranslations', function(assert) {
  this.model.addTranslations({
    foo: {
      bar: {
        baz: 'BAZ WORKZ'
      }
    }
  });

  assert.equal(this.model.getValue('foo.bar.baz'), 'BAZ WORKZ');
});

test('can handle flat object shape passed into addTranslations', function(assert) {
  this.model.addTranslations({
    baz: 'BAZZZ'
  });

  assert.equal(this.model.getValue('baz'), 'BAZZZ');
});
