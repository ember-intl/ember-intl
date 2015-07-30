/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatMessageHelper from 'ember-intl/helpers/format-message';
import Translation from 'ember-intl/models/translation';
import registerHelper from 'ember-intl/utils/register-helper';
import computed from 'ember-new-computed';
import intlGet from '../../helpers/intl-get';
import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';

const { run:emberRun, get } = Ember;
let view;

moduleFor('ember-intl@formatter:format-message', {
    needs: ['service:intl', 'ember-intl@adapter:-intl-adapter'],
    beforeEach() {
        registerHelper('format-message', formatMessageHelper, this.container);
        this.container.register('helper:intl-get', intlGet);
        this.container.register('application:main', Ember.Application.extend());
        this.container.register('ember-intl@translation:en-us', Translation.extend({
            foo: {
                bar: 'foo bar baz',
                baz: 'baz baz baz'
            }
        }));

        this.container.register('formats:main', {
            date: {
                shortWeekDay: {
                    day:   'numeric',
                    month: 'long',
                    year:  'numeric'
                }
            }
        });

        this.container.injection('formatter', 'intl', 'service:intl');
        this.render = createIntlBlock(this.container);
    },
    afterEach() {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatMessageHelper);
});

test('invoke formatMessage directly', function(assert) {
    assert.expect(1);
    const service = this.container.lookup('service:intl');
    assert.equal(service.formatMessage('hello {world}', {
        world: 'world'
    }), 'hello world');
});

test('message is formatted correctly with argument', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message "Hello {name}" name="Jason"}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message}}`, 'en-us');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-message');
});

test('should return a formatted string', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message MSG firstName=firstName lastName=lastName}}`, 'en-us');
    view.set('context', {
        MSG      : 'Hi, my name is {firstName} {lastName}.',
        firstName: 'Anthony',
        lastName : 'Pipkin'
    });
    runAppend(view);
    assert.equal(view.$().text(), "Hi, my name is Anthony Pipkin.");
});

test('should return a formatted string with formatted numbers and dates', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message POP_MSG city=city population=population census_date=census_date timeZone=timeZone}}`, 'en-us');
    view.set('context', {
        POP_MSG    : '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
        city       : 'Atlanta',
        population : 5475213,
        census_date: (new Date('1/1/2010')).getTime(),
        timeZone   : 'UTC'
    });
    runAppend(view);
    assert.equal(view.$().text(), "Atlanta has a population of 5,475,213 as of January 1, 2010.");
});

test('should return a formatted string with formatted numbers and dates in a different locale', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message POP_MSG city=city population=population census_date=census_date timeZone=timeZone}}`, 'de-de');
    view.set('context', {
        POP_MSG    : '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
        city       : 'Atlanta',
        population : 5475213,
        census_date: (new Date('1/1/2010')),
        timeZone   : 'UTC'
    });
    runAppend(view);
    assert.equal(view.$().text(), "Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.");
});

test('should return a formatted string with an `each` block', function(assert) {
    assert.expect(1);

    view = this.render(
      hbs`
        {{#each harvests as |harvest|}}{{format-message HARVEST_MSG person=harvest.person count=harvest.count}}{{/each}}
      `,
      'en-us'
    );

    view.set('context', {
        HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
        harvests: Ember.A([
            { person: 'Allison', count: 10 },
            { person: 'Jeremy', count: 60 }
        ])
    });

    runAppend(view);
    assert.equal(view.$().text().trim(), "Allison harvested 10 apples.Jeremy harvested 60 apples.");
});

test('intl-get returns message and format-message renders', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message (intl-get "foo.bar")}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().text(), "foo bar baz");
});

test('locale can add message and intl-get can read it', function(assert) {
    assert.expect(1);
    const translation = this.container.lookup('ember-intl@translation:en-us');
    translation.addTranslation('adding', 'this works also');
    view = this.render(hbs`{{format-message (intl-get "adding")}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().text(), "this works also");
});

test('intl-get handles bound computed property', function(assert) {
    assert.expect(3);
    view = this.render(hbs`{{format-message (intl-get computedMessage)}}`, 'en-us');
    const context = Ember.Object.extend({
        foo: true,
        computedMessage: computed('foo', {
            get() {
                return get(this, 'foo') ? 'foo.bar' : 'foo.baz';
            }
        })
    }).create();
    view.set('context', context);
    runAppend(view);
    assert.equal(view.$().text(), "foo bar baz");
    emberRun(() => {
        view.set('context.foo', false);
    });
    assert.equal(view.$().text(), "baz baz baz");
    runDestroy(view);
    emberRun(() => {
        context.set('foo', true);
    });
    assert.ok(context, 'Updating binding to view after view is destroyed should not raise exception.');
});

test('locale can add message to intl service and read it', function(assert) {
    assert.expect(1);
    emberRun(() => {
        const service = this.container.lookup('service:intl');
        service.addTranslation('en-us', 'oh', 'hai!').then(() => {
            view = this.render(hbs`{{format-message (intl-get "oh")}}`, 'en-us');
            runAppend(view);
            assert.equal(view.$().text(), "hai!");
        });
    });
});

test('locale can add messages object and intl-get can read it', function(assert) {
    assert.expect(1);

    const translation = this.container.lookup('ember-intl@translation:en-us');
    translation.addTranslations({
        'bulk-add': 'bulk add works'
    });

    view = this.render(hbs`{{format-message (intl-get "bulk-add")}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().text(), "bulk add works");
});

test('should respect format options for date ICU block', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-message "Sale begins {day, date, shortWeekDay}" day=1390518044403}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().text(), "Sale begins January 23, 2014");
});

test('intl-get returns message for key that is a literal string (not an object path)', function(assert) {
    assert.expect(1);

    const translation = this.container.lookup('ember-intl@translation:en-us');
    const fn = translation.getValue;

    translation.getValue = function (key) {
        return this[key];
    };

    translation['string.path.works'] = 'yes it does';

    try {
        view = this.render(hbs`{{format-message (intl-get "string.path.works")}}`, 'en-us');
        runAppend(view);
        assert.equal(view.$().text(), "yes it does");
    } catch(ex) {
        console.error(ex);
    } finally {
        // reset the function back
        translation.getValue = fn;
    }
});
