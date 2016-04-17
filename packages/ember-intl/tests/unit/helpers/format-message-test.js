import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatMessageHelper from 'ember-intl/helpers/format-message';
import Translation from 'ember-intl/models/translation';

const locale = 'en-us';
let service, registry;

moduleForComponent('format-message', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');
    registry.register('ember-intl@translation:en-us', Translation.extend());
    this.container.lookup('ember-intl@translation:en-us').addTranslations({
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
    locale: 'en-us'
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
    harvests: Ember.A([
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

  Ember.run(() => {
    service.addTranslation('en-us', 'oh', 'hai!').then(() => {
      this.render(hbs`{{format-message 'oh'}}`);
      assert.equal(this.$().text(), 'hai!');
    });
  });
});

test('locale can add messages object and can read it', function(assert) {
  assert.expect(1);

  const translation = this.container.lookup('ember-intl@translation:en-us');
  translation.addTranslations({ 'bulk-add': 'bulk add works' });

  this.render(hbs`{{format-message "bulk-add"}}`);

  assert.equal(this.$().text(), "bulk add works");
});

test('exists returns false when key not found', function(assert) {
  assert.expect(1);
  assert.equal(service.exists('bar'), false);
});

test('exists returns true when key found', function(assert) {
  assert.expect(1);
  const translation = this.container.lookup('ember-intl@translation:en-us');
  translation.addTranslation('hello', 'world');
  assert.equal(service.exists('hello'), true);
});

test('able to discover all register translations', function(assert) {
  assert.expect(1);
  assert.equal(service.getLocalesByTranslations().join('; '), 'en-us; es-es; fr-fr');
});

test('should respect format options for date ICU block', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message (l 'Sale begins {day, date, shortWeekDay}') day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
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
    this.render(hbs`{{format-message (intl-get 'string.path.works')}}`);

    assert.equal(this.$().text(), 'yes it does');
  } catch(ex) {
    console.error(ex);
  } finally {
    // reset the function back
    translation.getValue = fn;
  }
});

test('l helper handles bound computed property', function(assert) {
  const done = assert.async();
  assert.expect(2);

  const context = Ember.Object.extend({
    foo: true,
    cp: Ember.computed('foo', {
      get() {
        return Ember.get(this, 'foo') ? 'foo foo' : 'bar bar';
      }
    })
  }).create();

  this.set('context', context);
  this.render(hbs`{{format-message (l context.cp)}}`);
  assert.equal(this.$().text(), 'foo foo');

  Ember.run(() => {
    context.set('foo', false);
    Ember.run.next(() => {
      assert.equal(this.$().text(), 'bar bar');
      done();
    });
  });
});

test('intl-get handles bound computed property', function(assert) {
  assert.expect(3);

  const context = Ember.Object.extend({
    foo: true,
    cp: Ember.computed('foo', {
      get() {
        return Ember.get(this, 'foo') ? 'foo.bar' : 'foo.baz';
      }
    })
  }).create();

  this.set('context', context);

  this.render(hbs`{{format-message (intl-get context.cp)}}`);

  assert.equal(this.$().text(), 'foo bar baz');

  Ember.run(() => {
    this.set('context.foo', false);
  });

  assert.equal(this.$().text(), 'baz baz baz');

  Ember.run(() => {
    context.set('foo', true);
  });

  assert.ok(context, 'Updating binding to view after view is destroyed should not raise exception.');
});
