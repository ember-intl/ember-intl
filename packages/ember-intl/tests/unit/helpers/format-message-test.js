import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatMessageHelper from 'ember-intl/helpers/format-message';

const { get, set, computed, run, A:emberArray, Object:EmberObject } = Ember;

const locale = 'en-us';
let service, registry;

moduleForComponent('format-message', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');

    service.addTranslations('en-us', {
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz'
      }
    });

    registry.register('formats:main', {
      date: {
        shortWeekDay: {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      }
    });

    registry.injection('formatter', 'intl', 'service:intl');
    service.setLocale(locale);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatMessageHelper);
});

test('invoke formatMessage directly', function(assert) {
  assert.expect(1);
  assert.equal(service.formatMessage('hello {world}', {
    world: 'world'
  }), 'hello world');
});

test('invoke formatMessage directly with formats', function(assert) {
  assert.expect(1);
  assert.equal(service.formatMessage('Sale begins {day, date, shortWeekDay}', {
    day: 1390518044403,
    locale: 'en_us'
  }), 'Sale begins January 23, 2014');
});

test('message is formatted correctly with argument', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message (l "Hello {name}") name="Jason"}}`);
  assert.equal(this.$().text(), 'Hello Jason');
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);

  try {
    this.render(hbs`{{format-message}}`);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-message');
  }
});

test('should return a formatted string', function(assert) {
  assert.expect(1);

  this.setProperties({
    MSG: 'Hi, my name is {firstName} {lastName}.',
    firstName: 'Anthony',
    lastName: 'Pipkin'
  });

  this.render(hbs`{{format-message (l MSG) firstName=firstName lastName=lastName}}`);

  assert.equal(this.$().text(), 'Hi, my name is Anthony Pipkin.');
});

test('should return a formatted string with formatted numbers and dates', function(assert) {
  assert.expect(1);

  this.setProperties({
    POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
    city: 'Atlanta',
    population: 5475213,
    census_date: (new Date('1/1/2010')).getTime(),
    timeZone: 'UTC'
  });

  this.render(hbs`{{format-message (l POP_MSG) city=city population=population census_date=census_date timeZone=timeZone}}`);
  assert.equal(this.$().text(), 'Atlanta has a population of 5,475,213 as of January 1, 2010.');
});

test('should return a formatted string with formatted numbers and dates in a different locale', function(assert) {
  assert.expect(1);
  service.setLocale('de-de');
  this.setProperties({
    POP_MSG: '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
    city: 'Atlanta',
    population: 5475213,
    census_date: (new Date('1/1/2010')),
    timeZone: 'UTC'
  });

  this.render(hbs`{{format-message (l POP_MSG) city=city population=population census_date=census_date timeZone=timeZone}}`);
  assert.equal(this.$().text(), 'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.');
});

test('should return a formatted string with an `each` block', function(assert) {
  assert.expect(1);

  this.setProperties({
    HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
    harvests: emberArray([
      { person: 'Allison', count: 10 },
      { person: 'Jeremy', count: 60 }
    ])
  });

  this.render(
    hbs`
    {{#each harvests as |harvest|}}{{format-message (l HARVEST_MSG) person=harvest.person count=harvest.count}}{{/each}}
    `);

  assert.equal(this.$().text().trim(), 'Allison harvested 10 apples.Jeremy harvested 60 apples.');
});

test('locale can add message to intl service and read it', function(assert) {
  assert.expect(1);

  run(() => {
    service.addTranslation('en-us', 'oh', 'hai!');
    this.render(hbs`{{format-message 'oh'}}`);
    assert.equal(this.$().text(), 'hai!');
  });
});

test('locale can add messages object and can read it', function(assert) {
  assert.expect(1);

  service.addTranslations('en-us', { 'bulk-add': 'bulk add works' });
  this.render(hbs`{{format-message "bulk-add"}}`);

  assert.equal(this.$().text(), "bulk add works");
});

test('can inline locale for missing locale', function(assert) {
  assert.expect(1);
  this.render(hbs`{{t 'foo.bar' locale='xx-xx'}}`);
  assert.equal(this.$().text(), `Missing translation: foo.bar`);
});

test('exists returns false when key not found', function(assert) {
  assert.expect(1);
  assert.equal(service.exists('bar'), false);
});

test('exists returns true when key found', function(assert) {
  assert.expect(1);
  service.addTranslation('en-us', 'hello', 'world');
  assert.equal(service.exists('hello'), true);
});

test('able to discover all register translations', function(assert) {
  assert.expect(2);
  service.addTranslation('es_MX', 'foo', 'bar'); /* tests that the locale name becomes normalized to es-mx */
  service.exists('test', 'fr-ca');
  assert.equal(service.getLocalesByTranslations().join('; '), 'en-us; es-mx');
  assert.equal(service.locales().join('; '), 'en-us; es-mx');
});

test('should respect format options for date ICU block', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message (l 'Sale begins {day, date, shortWeekDay}') day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
});

test('should fallback to with defaultMessage when key not found', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message 'app.sale_begins' defaultMessage='Sale begins {day, date, shortWeekDay}' day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
});

test('should fallback to with fallback when key not found', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message 'app.sale_begins' fallback='Sale begins {day, date, shortWeekDay}' day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
});

test('l helper handles bound computed property', function(assert) {
  const done = assert.async();
  assert.expect(2);

  const context = EmberObject.extend({
    foo: true,
    cp: computed('foo', {
      get() {
        return get(this, 'foo') ? 'foo foo' : 'bar bar';
      }
    })
  }).create();

  set(this, 'context', context);
  this.render(hbs`{{format-message (l context.cp)}}`);
  assert.equal(this.$().text(), 'foo foo');

  run(() => {
    context.set('foo', false);
    run.next(() => {
      assert.equal(this.$().text(), 'bar bar');
      done();
    });
  });
});
