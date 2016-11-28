
Unit Testing
==============================================================================

Unlike integration tests, dependencies are not registered on the container by
default.  For this reason, we need to bring in all the dependencies we need
via `needs`.

For a live example of an application unit testing against ember-intl, check
out [ember-intl-example](https://github.com/jasonmit/ember-intl-example/tree/master/tests)

```js
import { moduleForComponent, test } from 'ember-qunit';
import instanceInitializer from '../../instance-initializers/ember-intl';

moduleForComponent('x-product', 'XProductComponent', {
  unit: true,
  needs: [
    'service:intl', // required
    'ember-intl@adapter:default', // required with format-message
    'ember-intl@formatter:format-message', // optional
    'ember-intl@formatter:format-html-message', // optional
    'ember-intl@formatter:format-date', // optional
    'ember-intl@formatter:format-time', // optional
    'ember-intl@formatter:format-number', // optional
    'ember-intl@formatter:format-relative', // optional
    'helper:intl-get', // optional
    'helper:t', // optional, if used then be sure to include the format-message formatter above
    'helper:t-html', // optional, if used then be sure to include the format-html-message formatter above
    'helper:format-date', // optional
    'helper:format-time', // optional
    'helper:format-relative', // optional
    'helper:format-number' // optional
  ],
  setup() {
    instanceInitializer.initialize(this);
    this.container.lookup('service:intl').setLocale('en-us');
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  const component = this.subject({
    price: 1000,
    deadline: new Date()
  });

  assert.equal(component._state, 'preRender');
  this.render();
  assert.equal(component._state, 'inDOM');
});
```
