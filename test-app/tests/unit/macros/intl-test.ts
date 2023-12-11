import { setOwner } from '@ember/application';
import EmberObject, { set } from '@ember/object';
import { run } from '@ember/runloop';
import type { IntlService } from 'ember-intl';
import { intl } from 'ember-intl/macros';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

class ContainerObject extends EmberObject {}

module('Unit | Macro | intl', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks);

  test('looks up the intl service through the owner and injects the service invisibly', function (assert) {
    const intlService = this.owner.lookup('service:intl');

    const emberObject = ContainerObject.extend({
      someProperty: intl(function (_intl: IntlService) {
        assert.strictEqual(_intl, intlService);

        assert.step('Called intl()');
      }),
    }).create();

    setOwner(emberObject, this.owner);

    emberObject.get('someProperty');

    const propertyNames = Object.getOwnPropertyNames(emberObject);
    const keys = Object.keys(emberObject);

    assert.true(
      propertyNames.some((name) => name.includes('intl-')),
      'service is injected',
    );

    assert.false(
      keys.some((name) => name.includes('intl-')),
      'service is non-enumerable',
    );

    assert.verifySteps(['Called intl()']);
  });

  test('does not use or clobber the pre-existing intl injection', function (assert) {
    const intlService = this.owner.lookup('service:intl');

    const IDENTITY = {};

    const emberObject = ContainerObject.extend({
      intl: IDENTITY,

      someProperty: intl(function (_intl: IntlService) {
        assert.strictEqual(_intl, intlService);

        assert.step('Called intl()');
      }),
    }).create();

    setOwner(emberObject, this.owner);

    emberObject.get('someProperty');

    assert.strictEqual(emberObject.get('intl'), IDENTITY);

    assert.verifySteps(['Called intl()']);
  });

  test('passes the propertyKey, context, and binds to it', function (assert) {
    const emberObject = ContainerObject.extend({
      someProperty: intl(function (
        _intl: IntlService,
        propertyKey: string,
        ctx: any,
      ) {
        assert.strictEqual(propertyKey, 'someProperty');

        assert.strictEqual(ctx, emberObject, 'passes context');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: 'this' implicitly has type 'any' because it does not have a type annotation.
        assert.strictEqual(this, emberObject, 'binds to the instance');

        assert.step('Called intl()');
      }),
    }).create();

    setOwner(emberObject, this.owner);

    emberObject.get('someProperty');

    assert.verifySteps(['Called intl()']);
  });

  test('uses the return value of the passed function as the computed property value', function (assert) {
    const emberObject = ContainerObject.extend({
      someProperty: intl(function () {
        return 'some-value';
      }),
    }).create();

    setOwner(emberObject, this.owner);

    assert.strictEqual(emberObject.get('someProperty'), 'some-value');
  });

  test('listens for locale changes', async function (assert) {
    const emberObject = ContainerObject.extend({
      someProperty: intl((_intl: IntlService) => {
        return _intl.locale;
      }),
    }).create();

    setOwner(emberObject, this.owner);

    assert.deepEqual(emberObject.get('someProperty'), ['en-us']);

    await setLocale('de-de');

    assert.deepEqual(emberObject.get('someProperty'), ['de-de']);
  });

  test('accpets further dependent keys', function (assert) {
    const emberObject = ContainerObject.extend({
      key1: 1,
      key2: 2,

      someProperty: intl(
        'key1',
        'key2',
        function (_intl: IntlService, _propertyKey: string, ctx: any) {
          return [ctx.key1, ctx.key2].join(', ');
        },
      ),
    }).create();

    setOwner(emberObject, this.owner);

    assert.strictEqual(emberObject.get('someProperty'), '1, 2');

    emberObject.set('key1', 3);

    assert.strictEqual(emberObject.get('someProperty'), '3, 2');

    run(() => set(emberObject, 'key2', 4));

    assert.strictEqual(emberObject.get('someProperty'), '3, 4');
  });
});
