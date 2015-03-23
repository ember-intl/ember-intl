import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatMessage from '../../formatters/format-message';
import formatMessageHelper from '../../helpers/format-message';
import intlGet from '../../helpers/intl-get';
import Locale from 'ember-intl/models/locale';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';

var view, container;

moduleForIntl('format-message', {
    setup: function (__container) {
        container = __container;

        container.register('helper:intl-get', intlGet, { instantiate: false });
        container.register('application:main', Ember.Application.extend());
        container.register('adapter:-intl-adapter', IntlAdapter.extend());
        container.register('formatter:format-message', FormatMessage);

        Ember.HTMLBars._registerHelper('format-message', formatMessageHelper);

        container.register('locale:en', Locale.extend({
            messages: {
                foo: {
                    bar: 'foo bar baz',
                    baz: 'baz baz baz'
                }
            }
        }));
    },
    teardown: function () {
        runDestroy(view);
        container = undefined;
    }
});

test('exists', function() {
    expect(1);
    ok(formatMessageHelper);
});

test('invoke formatMessage directly', function() {
    expect(1);

    equal(this.service.formatMessage('hello {world}', {
        world: 'world'
    }), 'hello world');
});

test('message is formatted correctly with argument', function() {
    expect(1);

    view = this.intlBlock('{{format-message "Hello {name}" name="Jason"}}');
    runAppend(view);

    equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-message}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-message');
});

test('should return a formatted string', function() {
    expect(1);

    view = this.intlBlock('{{format-message MSG firstName=firstName lastName=lastName}}', {locales: 'en-US'});

    view.set('context', {
        MSG      : 'Hi, my name is {firstName} {lastName}.',
        firstName: 'Anthony',
        lastName : 'Pipkin'
    });

    runAppend(view);

    equal(view.$().text(), "Hi, my name is Anthony Pipkin.");
});

test('should return a formatted string with formatted numbers and dates', function() {
    expect(1);

    view = this.intlBlock('{{format-message POP_MSG city=city population=population census_date=census_date timeZone=timeZone}}', {locales: 'en-US'});

    view.set('context', {
        POP_MSG    : '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
        city       : 'Atlanta',
        population : 5475213,
        census_date: (new Date('1/1/2010')).getTime(),
        timeZone   : 'UTC'
    });

    runAppend(view);

    equal(view.$().text(), "Atlanta has a population of 5,475,213 as of January 1, 2010.");
});

test('should return a formatted string with formatted numbers and dates in a different locale', function() {
    expect(1);

    view = this.intlBlock('{{format-message POP_MSG city=city population=population census_date=census_date timeZone=timeZone}}', {locales: 'de-DE'});

    view.set('context', {
        POP_MSG    : '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
        city       : 'Atlanta',
        population : 5475213,
        census_date: (new Date('1/1/2010')),
        timeZone   : 'UTC'
    });

    runAppend(view);

    equal(view.$().text(), "Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.");
});

test('should return a formatted string with an `each` block', function() {
    expect(1);

    view = this.intlBlock('{{#each harvest in harvests}} {{format-message HARVEST_MSG person=harvest.person count=harvest.count }}{{/each}}');

    view.set('context', {
        HARVEST_MSG : '{person} harvested {count, plural, one {# apple} other {# apples}}.',
        harvests    : [
            { person: 'Allison', count: 10 },
            { person: 'Jeremy', count: 60 }
        ]
    });

    runAppend(view);

    equal(view.$().text(), " Allison harvested 10 apples. Jeremy harvested 60 apples.");
});

test('intl-get returns message and format-message renders', function () {
    expect(1);

    view = this.intlBlock('{{format-message (intl-get "messages.foo.bar")}}');
    runAppend(view);

    equal(view.$().text(), "foo bar baz");
});

test('locale can add message and intl-get can read it', function () {
    expect(1);

    var locale = container.lookup('locale:en');
    locale.addMessage('adding', 'this works also');

    view = this.intlBlock('{{format-message (intl-get "messages.adding")}}');
    runAppend(view);
    equal(view.$().text(), "this works also");
});

test('intl-get handles bound computed property', function () {
    expect(3);

    view = this.intlBlock('{{format-message (intl-get computedMessage)}}');

    var context = Ember.Object.extend({
        foo: true,
        computedMessage: Ember.computed('foo', function () {
            return this.get('foo') ? 'messages.foo.bar' : 'messages.foo.baz';
        })
    }).create();

    view.set('context', context);

    runAppend(view);

    equal(view.$().text(), "foo bar baz");

    Ember.run(function () {
        view.set('context.foo', false);
    });

    equal(view.$().text(), "baz baz baz");

    runDestroy(view);

    Ember.run(function () {
        context.set('foo', true);
    });

    ok(context, 'Updting binding to view after view is destroyed should not raise exception.');
});

test('locale can add message to intl service and read it', function () {
    expect(1);

    var self = this;
    var service = this.service;

    Ember.run(function () {
        service.addMessage('en', 'oh', 'hai!').then(function () {
            view = self.intlBlock('{{format-message (intl-get "messages.oh")}}');
            runAppend(view);
            equal(view.$().text(), "hai!");
        });
    });
});

test('locale can add messages object and intl-get can read it', function () {
    expect(1);

    var locale = container.lookup('locale:en');
    locale.addMessages({
        'bulk-add': 'bulk add works'
    });

    view = this.intlBlock('{{format-message (intl-get "messages.bulk-add")}}');
    runAppend(view);
    equal(view.$().text(), "bulk add works");
});

test('should respect format options for date ICU block', function () {
    expect(1);

    container.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    container.register('formats:main', {
        date: {
            shortWeekDay: {
                day:   'numeric',
                month: 'long',
                year:  'numeric'
            }
        }
    });

    view = this.intlBlock('{{format-message "Sale begins {day, date, shortWeekDay}" day=1390518044403}}');
    runAppend(view);

    equal(view.$().text(), "Sale begins January 23, 2014");
});

test('intl-get returns message for key that is a literal string (not an object path)', function () {
    expect(1);

    var locale = container.lookup('locale:en');

    try {
        container.unregister('locale:en');
        container.register('locale:en', Locale.extend({
            'string.path.works': 'yes it does',
            getValue: function (key) {
                return this[key];
            }
        }), { singleton: true, instantiate: true });

        view = this.intlBlock('{{format-message (intl-get "string.path.works")}}');
        runAppend(view);

        equal(view.$().text(), "yes it does");
    }
    finally {
        container.unregister('locale:en');
        container.register('locale:en', locale, { instantiate: false });
    }
});
