import { setOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject, { get, getProperties, set } from '@ember/object';
import { run } from '@ember/runloop';
import { setupIntl } from 'ember-intl/test-support';
import { intl } from 'ember-intl';

module('Unit | Macros | intl', function(hooks) {
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

  test('looks up the intl service through the owner and injects the service invisibly', function(assert) {
    assert.expect(3);

    const object = this.ContainerObject.extend({
      property: intl(intl => assert.strictEqual(intl, this.intl, 'service is accessible in CP callback'))
    }).create();

    get(object, 'property');

    const hasIntl = k => k.startsWith('intl');
    assert.ok(Object.getOwnPropertyNames(object).some(hasIntl), 'service is injected');
    assert.notOk(Object.keys(object).some(hasIntl), 'service is non-enumerable');
  });

  test('does not use or clobber the pre-existing intl injection', function(assert) {
    assert.expect(2);

    const IDENTITY = {};

    const object = this.ContainerObject.extend({
      intl: IDENTITY,
      property: intl(intl => assert.strictEqual(intl, this.intl))
    }).create();

    get(object, 'property');

    assert.strictEqual(get(object, 'intl'), IDENTITY);
  });

  test('passes the propertyKey, context, and binds to it', function(assert) {
    assert.expect(3);

    const object = this.ContainerObject.extend({
      property: intl(function(intl, propertyKey, ctx) {
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
      property: intl(() => IDENTITY)
    }).create();

    assert.strictEqual(get(object, 'property'), IDENTITY);
  });

  test('listens for locale changes', function(assert) {
    assert.expect(2);

    this.intl.setLocale('en-us');

    const object = this.ContainerObject.extend({
      property: intl(intl => get(intl, 'locale'))
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
      property: intl(...dependencyKeys, (intl, propertyKey, ctx) => getProperties(ctx, ...dependencyKeys))
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
