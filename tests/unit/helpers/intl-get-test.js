import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import intlGetHelper from 'ember-intl/helpers/intl-get';

module('intl-get', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.addTranslations('en-us', { greeting: 'Hello' });
    this.intl.addTranslations('fr-fr', { greeting: 'Bonjour' });
    this.intl.setLocale('en-us');
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(intlGetHelper);
  });

  test('should recompute on intl locale change in', async function(assert) {
    assert.expect(1);

    const recomputeFn = intlGetHelper.proto().recompute;
    let triggered = 0;

    intlGetHelper.reopen({
      recompute() {
        triggered++;
      }
    });

    await render(hbs`{{intl-get "greeting"}}`);

    run(() => {
      this.intl.setLocale('fr-fr');
      this.intl.setLocale('en-us');
      assert.equal(triggered, 2);
    });

    // restore original function
    intlGetHelper.reopen({ recompute: recomputeFn });
  });
});
