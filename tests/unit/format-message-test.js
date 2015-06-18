import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { runAppend, runDestroy } from '../helpers/run-append';
import formatMessageHelper from 'ember-intl/helpers/format-message';
import intlGet from '../../helpers/intl-get';
import Translation from 'ember-intl/models/translation';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';
import computed from 'ember-new-computed';

var view, container;

moduleFor('ember-intl@formatter:format-message', {
    needs: ['service:intl'],
    beforeEach: function () {
        this.container.register('adapter:-intl-adapter', IntlAdapter.extend());
        this.container.register('application:main', Ember.Application.extend());
        this.container.register('ember-intl@translation:en', Translation.extend({
            foo: {
                bar: 'foo bar baz',
                baz: 'baz baz baz'
            }
        }));

        this.container.optionsForType('formats', {
            singleton:   true,
            instantiate: false
        });

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
        this.container.register('helper:intl-get', intlGet);
        this.container.register('helper:format-message', formatMessageHelper);
        this.service = this.container.lookup('service:intl');

        container = this.container;
        var service = this.service;

        this.intlBlock = function intlBlock(template, serviceContext) {
            if (typeof serviceContext === 'object') {
                Ember.run(function () {
                    service.setProperties(serviceContext);
                });
            }

            return Ember.View.create({
                template: Ember.HTMLBars.compile(template),
                container: container,
                context: {}
            });
        };
    },
    afterEach: function () {
        runDestroy(view);
        container = null;
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatMessageHelper);
});

test('invoke formatMessage directly', function(assert) {
    assert.expect(1);
    assert.equal(this.service.formatMessage('hello {world}', {
        world: 'world'
    }), 'hello world');
});

test('message is formatted correctly with argument', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-message "Hello {name}" name="Jason"}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-message}}', { locale: 'en' });
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-message');
});

test('should return a formatted string', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-message MSG firstName=firstName lastName=lastName}}', {locale: 'en-US'});
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
    view = this.intlBlock('{{format-message POP_MSG city=city population=population census_date=census_date timeZone=timeZone}}', {locale: 'en-US'});
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
    view = this.intlBlock('{{format-message POP_MSG city=city population=population census_date=census_date timeZone=timeZone}}', {locale: 'de-DE'});
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
    view = this.intlBlock('{{#each harvest in harvests}} {{format-message HARVEST_MSG person=harvest.person count=harvest.count }}{{/each}}', { locale: 'en' });
    view.set('context', {
        HARVEST_MSG : '{person} harvested {count, plural, one {# apple} other {# apples}}.',
        harvests    : [
            { person: 'Allison', count: 10 },
            { person: 'Jeremy', count: 60 }
        ]
    });
    runAppend(view);
    assert.equal(view.$().text(), " Allison harvested 10 apples. Jeremy harvested 60 apples.");
});

test('intl-get returns message and format-message renders', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-message (intl-get "foo.bar")}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "foo bar baz");
});

test('locale can add message and intl-get can read it', function(assert) {
    assert.expect(1);
    var translation = container.lookup('ember-intl@translation:en');
    translation.addMessage('adding', 'this works also');
    view = this.intlBlock('{{format-message (intl-get "adding")}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "this works also");
});

test('intl-get handles bound computed property', function(assert) {
    assert.expect(3);
    view = this.intlBlock('{{format-message (intl-get computedMessage)}}', { locale: 'en' });
    var context = Ember.Object.extend({
        foo: true,
        computedMessage: computed('foo', function () {
            return this.get('foo') ? 'foo.bar' : 'foo.baz';
        })
    }).create();
    view.set('context', context);
    runAppend(view);
    assert.equal(view.$().text(), "foo bar baz");
    Ember.run(function () {
        view.set('context.foo', false);
    });
    assert.equal(view.$().text(), "baz baz baz");
    runDestroy(view);
    Ember.run(function () {
        context.set('foo', true);
    });
    assert.ok(context, 'Updting binding to view after view is destroyed should not raise exception.');
});

test('locale can add message to intl service and read it', function(assert) {
    assert.expect(1);
    var self = this;
    var service = this.service;
    Ember.run(function () {
        service.addMessage('en', 'oh', 'hai!').then(function () {
            view = self.intlBlock('{{format-message (intl-get "oh")}}', { locale: 'en' });
            runAppend(view);
            assert.equal(view.$().text(), "hai!");
        });
    });
});

test('locale can add messages object and intl-get can read it', function(assert) {
    assert.expect(1);

    var translation = container.lookup('ember-intl@translation:en');
    translation.addMessages({
        'bulk-add': 'bulk add works'
    });

    view = this.intlBlock('{{format-message (intl-get "bulk-add")}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "bulk add works");
});

test('should respect format options for date ICU block', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-message "Sale begins {day, date, shortWeekDay}" day=1390518044403}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "Sale begins January 23, 2014");
});

test('intl-get returns message for key that is a literal string (not an object path)', function(assert) {
    assert.expect(1);

    var translation = container.lookup('ember-intl@translation:en');
    var fn = translation.getValue;

    translation.getValue = function (key) {
        return this[key];
    };

    translation['string.path.works'] = 'yes it does';

    try {
      view = this.intlBlock('{{format-message (intl-get "string.path.works")}}', {locale: 'en'});
      runAppend(view);
      assert.equal(view.$().text(), "yes it does");
    } catch(ex) {
      console.error(ex);
    } finally {
      // reset the function back
      translation.getValue = fn;
    }
});
