import { run } from '@ember/runloop';
import { A as emberArray } from '@ember/array';
import EmberObject, { computed, set, get } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatMessageHelper from 'ember-intl/helpers/format-message';
import expectError from '../../helpers/expect-error';

const DEFAULT_LOCALE_NAME = 'en-us';

moduleForComponent('format-message', {
  integration: true,
  beforeEach() {
    let registry = this.registry || this.container;

    this.inject.service('intl');

    this.intl.addTranslations(DEFAULT_LOCALE_NAME, {
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

    this.intl.setLocale(DEFAULT_LOCALE_NAME);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatMessageHelper);
});

test('invoke formatMessage directly', function(assert) {
  assert.expect(1);
  assert.equal(this.intl.formatMessage('hello {world}', { world: 'world' }), 'hello world');
});

test('invoke formatMessage directly with formats', function(assert) {
  assert.expect(1);
  assert.equal(
    this.intl.formatMessage('Sale begins {day, date, shortWeekDay}', {
      day: 1390518044403,
      locale: 'en_us'
    }),
    'Sale begins January 23, 2014'
  );
});

test('message is formatted correctly with argument', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message (l 'Hello {name}') name='Jason'}}`);
  assert.equal(this.$().text(), 'Hello Jason');
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);

  expectError(
    () => this.render(hbs`{{format-message}}`),
    ex => {
      assert.ok(
        ex.message.match(
          /Assertion Failed: \[ember-intl\] translation lookup attempted but no translation key was provided\./
        )
      );
    }
  );
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
    census_date: new Date('1/1/2010').getTime(),
    timeZone: 'UTC'
  });

  this.render(
    hbs`{{format-message (l POP_MSG) city=city population=population census_date=census_date timeZone=timeZone}}`
  );
  assert.equal(this.$().text(), 'Atlanta has a population of 5,475,213 as of January 1, 2010.');
});

test('should return a formatted string with formatted numbers and dates in a different locale', function(assert) {
  assert.expect(1);
  this.intl.setLocale('de-de');
  this.setProperties({
    POP_MSG: '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
    city: 'Atlanta',
    population: 5475213,
    census_date: new Date('1/1/2010'),
    timeZone: 'UTC'
  });

  this.render(
    hbs`{{format-message (l POP_MSG) city=city population=population census_date=census_date timeZone=timeZone}}`
  );
  assert.equal(this.$().text(), 'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.');
});

test('should return a formatted string with an `each` block', function(assert) {
  assert.expect(1);

  this.setProperties({
    HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
    harvests: emberArray([{ person: 'Allison', count: 10 }, { person: 'Jeremy', count: 60 }])
  });

  this.render(
    hbs`
    {{#each harvests as |harvest|}}{{format-message (l HARVEST_MSG) person=harvest.person count=harvest.count}}{{/each}}
    `
  );

  assert.equal(
    this.$()
      .text()
      .trim(),
    'Allison harvested 10 apples.Jeremy harvested 60 apples.'
  );
});

test('able to discover all register translations', function(assert) {
  assert.expect(2);
  this.intl.addTranslation('es_MX', 'foo', 'bar');
  /* tests that the locale name becomes normalized to es-mx */
  this.intl.exists('test', 'fr-ca');
  assert.equal(this.intl.getLocalesByTranslations().join('; '), 'en-us; es-es; fr-fr; es-mx');
  assert.equal(get(this.intl, 'locales').join('; '), 'en-us; es-es; fr-fr; es-mx');
});

test('should respect format options for date ICU block', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-message (l 'Sale begins {day, date, shortWeekDay}') day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
});

test('should return 0 instead of nothing', function(assert) {
  assert.expect(1);
  this.set('count', 0);
  this.render(hbs`{{format-message (l '{count}') count=count}}`);
  assert.equal(this.$().text(), '0');
});

test('intl-get returns message for key that is a literal string (not an object path)', function(assert) {
  assert.expect(1);

  const adapter = this.container.lookup('ember-intl@adapter:default');
  const translation = adapter._cache['en-us'];
  const fn = translation.getValue;

  translation.getValue = function getValue(key) {
    return translation[key];
  };

  translation['string.path.works'] = 'yes it does';

  try {
    this.render(hbs`{{format-message (intl-get 'string.path.works')}}`);
    assert.equal(this.$().text(), 'yes it does');
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex);
  } finally {
    // reset the function back
    translation.getValue = fn;
  }
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

test('intl-get handles bound computed property', function(assert) {
  assert.expect(3);

  const context = EmberObject.extend({
    foo: true,
    cp: computed('foo', {
      get() {
        return get(this, 'foo') ? 'foo.bar' : 'foo.baz';
      }
    })
  }).create();

  set(this, 'context', context);

  this.render(hbs`{{format-message (intl-get context.cp)}}`);

  assert.equal(this.$().text(), 'foo bar baz');

  run(() => {
    set(this, 'context.foo', false);
  });

  assert.equal(this.$().text(), 'baz baz baz');

  run(() => {
    context.set('foo', true);
  });

  assert.ok(context, 'Updating binding to view after view is destroyed should not raise exception.');
});
