
Integration Testing
==============================================================================

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | x-product', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
     this.intl = this.owner.lookup('service:intl');
     this.intl.setLocale('en-us');
  });

  test('it renders', async function(assert) {
    assert.expect(1);
    await render(hbs`{{x-product price=price deadline=deadline}}`);
    this.set('price', 1000);
    this.set('deadline', new Date());
    let output = this.$().text();
    assert.ok(output);
  });

  test('it translates', async function(assert) {
    assert.expect(1);

    /* waits for async behavior (loading translations on app boot) to settle */
    await settled();
    assert.equal(this.intl.t('some.key'), 'Hello world');
  });
});
```
