import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import tHelper from 'ember-intl/helpers/t';

const { run } = Ember;

const DEFAULT_LOCALE_NAME = 'en-us';

moduleForComponent('t', {
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
  assert.ok(tHelper);
});

test('should return nothing if key does not exist and allowEmpty is set to true', function(assert) {
  assert.expect(1);
  this.render(hbs`{{t 'does.not.exist' allowEmpty=true}}`);
  assert.equal(this.$().text(), '');
});

test('locale can add message to intl service and read it', function(assert) {
  assert.expect(1);

  run(() => {
    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'oh', 'hai!').then(() => {
      this.render(hbs`{{t 'oh'}}`);
      assert.equal(this.$().text(), 'hai!');
    });
  });
});

test('translation value can be an empty string', function(assert) {
  assert.expect(1);

  run(() => {
    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'empty_translation', '').then(() => {
      this.render(hbs`{{t 'empty_translation'}}`);
      assert.equal(this.$().text(), '');
    });
  });
});

test('locale can add messages object and can read it', function(assert) {
  assert.expect(1);

  return this.intl
    .addTranslations(DEFAULT_LOCALE_NAME, {
      'bulk-add': 'bulk add works'
    })
    .then(() => {
      this.render(hbs`{{t 'bulk-add'}}`);
      assert.equal(this.$().text(), 'bulk add works');
    });
});

test('can inline locale for missing locale', function(assert) {
  assert.expect(1);
  this.render(hbs`{{t 'foo.bar' locale='xx-xx'}}`);
  assert.equal(this.$().text(), `Missing translation: foo.bar`);
});

test('should fallback to with defaultMessage when key not found', function(assert) {
  assert.expect(1);
  this.render(hbs`{{t 'app.sale_begins' defaultMessage='Sale begins {day, date, shortWeekDay}' day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
});

test('should fallback to with fallback when key not found', function(assert) {
  assert.expect(1);
  this.render(hbs`{{t 'app.sale_begins' fallback='Sale begins {day, date, shortWeekDay}' day=1390518044403}}`);
  assert.equal(this.$().text(), 'Sale begins January 23, 2014');
});
