/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import registerHelper from 'ember-intl/utils/register-helper';
import tHelper from '../../helpers/t';

let registry;

moduleFor('ember-intl@formatter:format-message', {
  needs: ['service:intl', 'ember-intl@adapter:-intl-adapter'],
  beforeEach() {
    registry =  this.registry || this.container;
    registry.register('view:basic', Ember.View);
    registerHelper('t', tHelper, registry);
    registry.register('application:main', Ember.Application.extend());
    registry.injection('formatter', 'intl', 'service:intl');
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(tHelper);
});
