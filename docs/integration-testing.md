
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
import { moduleForComponent, test } from 'ember-qunit';
import instanceInitializer from '../../../instance-initializers/ember-intl';

moduleForComponent('x-product', 'XProductComponent', {
  integration: true,
  setup() {
    // manually invoke the ember-intl initializer
    instanceInitializer.initialize(this);
    let intl = this.container.lookup('service:intl');
    intl.setLocale('en-us');
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
```
