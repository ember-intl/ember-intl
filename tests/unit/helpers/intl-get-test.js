import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import intlGetHelper from 'ember-intl/helpers/intl-get';

let service;

moduleForComponent('intl-get', {
  integration: true,
  beforeEach() {
    service = this.container.lookup('service:intl');

    service.addTranslations('en-us', { greeting: 'Hello' });

    service.addTranslations('fr-fr', { greeting: 'Bonjour' });

    service.setLocale('en-us');
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(intlGetHelper);
});

test('should recompute on intl locale change in', function(assert) {
  assert.expect(1);

  const recomputeFn = intlGetHelper.proto().recompute;
  let triggered = 0;

  intlGetHelper.reopen({
    recompute() {
      triggered++;
    }
  });

  this.render(hbs`{{intl-get "greeting"}}`);

  run(() => {
    service.setLocale('fr-fr');
    service.setLocale('en-us');
    assert.equal(triggered, 2);
  });

  // restore original function
  intlGetHelper.reopen({ recompute: recomputeFn });
});
