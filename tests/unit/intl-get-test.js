/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Translation from 'ember-intl/models/translation';
import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';
import intlGetHelper from '../../helpers/intl-get';

const { run:emberRun } = Ember;
let view, registry;

moduleFor('helper:intl-get', {
  needs: ['service:intl', 'ember-intl@adapter:-intl-adapter'],
  beforeEach() {
    registry = this.registry || this.container;
    registry.register('ember-intl@translation:en-us', Translation.extend({
      greeting: 'Hello'
    }));

    registry.register('ember-intl@translation:fr-fr', Translation.extend({
      greeting: 'Bonjour'
    }));

    this.render = createIntlBlock(registry);
  },
  afterEach() {
    runDestroy(view);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(intlGetHelper);
});

test('should recompute on intl locale change in', function(assert) {
  assert.expect(1);

  const recomputeFn = intlGetHelper.proto().recompute;
  const service = this.container.lookup('service:intl');
  let triggered = 0;

  intlGetHelper.reopen({
    recompute() {
      triggered++;
    }
  });

  view = this.render(hbs`{{intl-get "greeting"}}`, 'en-us');
  runAppend(view);

  emberRun(() => {
    service.setLocale('fr-fr');
    service.setLocale('en-us');
    assert.equal(triggered, 2);
  });

  // restore original function
  intlGetHelper.reopen({ recompute: recomputeFn });
});
