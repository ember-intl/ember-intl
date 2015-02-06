import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatMessage from '../../formatters/format-message';
import formatMessageHelper from '../../helpers/format-message';

var view;

moduleForIntl('format-message', {
    setup: function (container) {
        container.register('formatter:format-message', FormatMessage);
        container.register('helper:format-message', formatMessageHelper, { instantiate: false });
    },
    teardown: function () {
        runDestroy(view);
    }
});

test('exists', function() {
    expect(1);
    ok(formatMessageHelper);
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
