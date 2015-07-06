/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

import Translation from 'ember-intl/models/translation';
import registerHelper from 'ember-intl/utils/register-helper';
import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';
import intlGetHelper from '../../helpers/intl-get';
import newHelperTest from '../helpers/test';

var view;

moduleFor('helper:intl-get', {
    needs: ['service:intl', 'ember-intl@adapter:-intl-adapter'],
    beforeEach() {
        this.container.register('ember-intl@translation:en-us', Translation.extend({
            greeting: 'Hello'
        }));

        this.container.register('ember-intl@translation:fr-fr', Translation.extend({
            greeting: 'Bonjour'
        }));

        this.intlBlock = createIntlBlock(this.container);
    },
    afterEach() {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(intlGetHelper);
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{intl-get}}');

    try {
        runAppend(view);
    }
    catch (ex) {
        assert.ok(ex);
    }
});

newHelperTest('should recompute on intl locale change in >= 1.13.0', function(assert) {
    assert.expect(1);

    var recomputeFn = intlGetHelper.proto().recompute;
    var triggered = 0;
    var service = this.container.lookup('service:intl');

    intlGetHelper.reopen({
        recompute: function() {
            triggered++;
        }
    });

    view = this.intlBlock('{{intl-get "greeting"}}', { locale: 'en-us' });
    runAppend(view);

    Ember.run(function() {
        service.set('locale', 'fr-fr');
        service.set('locale', 'en-us');
        assert.equal(triggered, 2);
    });

    // restore original function
    intlGetHelper.reopen({ recompute: recomputeFn });
});
