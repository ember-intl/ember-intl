
Integration Testing
==============================================================================

```js
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { moduleForComponent, test } from 'ember-qunit';

let service;

moduleForComponent('x-product', 'XProductComponent', {
  integration: true,
  setup() {
    service = this.container.lookup('service:intl');
    service.set('locale', 'en-us');
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
