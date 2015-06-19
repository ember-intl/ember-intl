import Ember from 'ember';
import { module } from 'qunit';
import test from '../helpers/test';
import startApp from '../helpers/start-app';

var application;

function contains(selector, string) {
    var element = find(selector)[0];

    if (!element) {
        return ok(false, 'can\'t find element: ' + selector);
    }

    var text = element.textContent || element.innerText;
    return equal(text.replace(/^\s+|\s+$/g, ''), string);
}

module('Acceptance: Smoke', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        if (application) {
            Ember.run(application, 'destroy');
        }
    }
});

test('format-number', function(assert) {
    visit('/smoke');

    andThen(function() {
        contains('.format-number', '€1,000.00');
    });
});

test('format-date', function(assert) {
    visit('/smoke');

    andThen(function() {
        contains('.format-date', '1/23/2014');
    });
});

test('format-time', function(assert) {
    visit('/smoke');

    andThen(function() {
        contains('.format-time', '18:00:44');
    });
});

test('format-relative', function(assert) {
    visit('/smoke');

    andThen(function() {
        contains('.format-relative', 'yesterday');
    });
});
