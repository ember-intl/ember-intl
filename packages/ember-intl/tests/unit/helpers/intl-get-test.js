import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import intlGetHelper from 'ember-intl/helpers/intl-get';
import Translation from 'ember-intl/models/translation';

const locale = 'en-us';
let service, registry;

moduleForComponent('intl-get', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');

    registry.register('ember-intl@translation:en-us', Translation.extend());
    registry.register('ember-intl@translation:fr-fr', Translation.extend());

    this.container.lookup('ember-intl@translation:en-us').addTranslations({
      greeting: 'Hello'
    });

    this.container.lookup('ember-intl@translation:fr-fr').addTranslations({
      greeting: 'Bonjour'
    });

    service.setLocale(locale);
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

  Ember.run(() => {
    service.setLocale('fr-fr');
    service.setLocale('en-us');
    assert.equal(triggered, 2);
  });

  // restore original function
  intlGetHelper.reopen({ recompute: recomputeFn });
});
