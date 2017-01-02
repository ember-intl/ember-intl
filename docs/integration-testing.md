
Integration Testing
==============================================================================

Like unit tests, integration tests do not invoke the initializers.  This is
why we need to implement a setup hook to manually invoke the initializer for
ember-intl.  The initializer's role is to register all of the helpers
(format-message, format-time, etc.)

Unlike unit tests, dependencies are registered on the container by default.
Therefor we can omit the `needs` property which specifies dependencies.
For this reason, integration tests are the recommended method for testing
with ember-intl.  That said, ember-intl is capable of being unit testable.

```js
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { moduleForComponent, test } from 'ember-qunit';
import instanceInitializer from 'app/instance-initializers/ember-intl'; /* "app" modulePrefix may vary */

let service;

moduleForComponent('x-product', 'XProductComponent', {
  integration: true,
  setup() {
    // manually invoke the ember-intl initializer
    instanceInitializer.initialize(this);
    service = this.container.lookup('service:intl');
    service.setLocale('en-us');
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{x-product price=price deadline=deadline}}`);
  this.set('price', 1000);
  this.set('deadline', new Date());
  let output = this.$().text();
  assert.ok(output);
});

test('it translates', function(assert) {
  assert.expect(1);

  /* waits for async behavior (loading translations on app boot) to settle */
  return wait().then(() => {
    assert.equal(service.t('some.key'), 'Hello world');
  });
});
```
