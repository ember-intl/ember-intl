import { setOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject, { get, getProperties, set } from '@ember/object';
import { run } from '@ember/runloop';
import { setupIntl } from 'ember-intl/test-support';
import { IntlComputedProperty } from 'ember-intl';

module('Unit | IntlComputedProperty', function(hooks) {
  setupTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');

    const { owner } = this;
    this.ContainerObject = EmberObject.extend({
      init() {
        this._super();
        setOwner(this, owner);
      }
    });
  });

  test('looks up the intl service through the owner, if it is not injected', function(assert) {
    assert.expect(1);

    const object = this.ContainerObject.extend({
      property: new IntlComputedProperty(intl => assert.strictEqual(intl, this.intl))
    }).create();

    get(object, 'property');
  });

  test('uses the pre-existing intl injection, if it already exists', function(assert) {
    assert.expect(1);

    const IDENTITY = {};

    const object = this.ContainerObject.extend({
      intl: IDENTITY,
      property: new IntlComputedProperty(intl => assert.strictEqual(intl, IDENTITY))
    }).create();

    get(object, 'property');
  });

  test('passes the propertyKey, context, and binds to it', function(assert) {
    assert.expect(3);

    const object = this.ContainerObject.extend({
      property: new IntlComputedProperty(function(intl, propertyKey, ctx) {
        assert.strictEqual(propertyKey, 'property', 'passes propertyKey');
        assert.strictEqual(ctx, object, 'passes context');
        assert.strictEqual(this, object, 'binds to the instance');
      })
    }).create();

    get(object, 'property');
  });

  test('uses the return value of the passed function as the computed property value', function(assert) {
    assert.expect(1);

    const IDENTITY = {};

    const object = this.ContainerObject.extend({
      property: new IntlComputedProperty(() => IDENTITY)
    }).create();

    assert.strictEqual(get(object, 'property'), IDENTITY);
  });

  test('listens for locale changes', function(assert) {
    assert.expect(2);

    this.intl.setLocale('en-us');

    const object = this.ContainerObject.extend({
      property: new IntlComputedProperty(intl => get(intl, 'locale'))
    }).create();

    assert.deepEqual(get(object, 'property'), ['en-us']);

    run(() => this.intl.setLocale('de-de'));
    assert.deepEqual(get(object, 'property'), ['de-de']);
  });

  test('accpets further dependent keys', function(assert) {
    const dependencies = { dependencyA: 1, dependencyB: 2, dependencyC: 3 };
    const dependencyKeys = Object.keys(dependencies);

    const object = this.ContainerObject.extend({
      dependencyA: 1,
      dependencyB: 2,
      dependencyC: 3,
      property: new IntlComputedProperty(...dependencyKeys, (intl, propertyKey, ctx) =>
        getProperties(ctx, ...dependencyKeys)
      )
    }).create();

    assert.deepEqual(get(object, 'property'), dependencies);

    run(() => set(object, 'dependencyA', 4));
    assert.deepEqual(get(object, 'property'), getProperties(object, ...dependencyKeys));

    run(() => set(object, 'dependencyB', 5));
    assert.deepEqual(get(object, 'property'), getProperties(object, ...dependencyKeys));

    run(() => set(object, 'dependencyC', 6));
    assert.deepEqual(get(object, 'property'), getProperties(object, ...dependencyKeys));
  });
});
