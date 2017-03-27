
Unit Testing
==============================================================================

Unlike integration tests, dependencies are not registered on the container by
default.  For this reason, we need to bring in all the dependencies we need
via `needs`.

For a live example of an application unit testing against ember-intl, check
out [ember-intl-example](https://github.com/jasonmit/ember-intl-example/tree/master/tests)

```js
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('x-product', 'XProductComponent', {
  unit: true,
  needs: [
    'formats:main',
    'config:environment',
    'service:intl', // required
    'ember-intl@adapter:default', // required with format-message
    `cldr:en`, // required (or language(s) of the locale(s) you plan to test against)
    `translation:en-us`, // required (or language(s) of the locale(s) you plan to test against)
    'util:intl/missing-message', // required

    /*
     * Below are optional.  You only need to include to formatters and helpers
     * that are utilized within your test.
     */
    'helper:intl-get',
    'helper:t',
    'helper:format-message',
    'helper:format-html-message',
    'helper:format-date',
    'helper:format-time',
    'helper:format-relative',
    'helper:format-number'
  ],
  setup() {
    let service = this.container.lookup('service:intl');
    service.setLocale('en-us');
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
