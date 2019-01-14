import { render } from '@ember/test-helpers';
import tHelper from 'ember-intl/helpers/t';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

const LOCALE = 'en-us';

module('t', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');

    this.intl.addTranslations(LOCALE, {
      html: {
        greeting: '<strong>Hello {name} {count, number}</strong>'
      },
      number: 2,
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz'
      }
    });

    this.intl.set('formats', {
      date: {
        shortWeekDay: {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      }
    });

    this.intl.set('locale', LOCALE);
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(tHelper);
  });

  test('should return nothing if key does not exist and allowEmpty is set to true', async function(assert) {
    assert.expect(1);
    this.intl.addTranslations(LOCALE, { empty: '' });
    await render(hbs`{{t 'does.not.exist' default='empty'}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should return a number string if translation is a number', async function(assert) {
    await render(hbs`{{t 'number'}}`);
    assert.equal(this.element.textContent, '2');
  });

  test('should escape attributes but not the translation string', async function(assert) {
    assert.expect(3);
    await render(hbs`{{t 'html.greeting' htmlSafe=true name="<em>Jason</em>" count=42000}}`);
    assert.equal(this.element.querySelectorAll('strong').length, 1);
    assert.equal(this.element.querySelectorAll('em').length, 0);
    assert.equal(this.element.innerHTML, `<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>`);
  });

  test('should render a TextNode', async function(assert) {
    assert.expect(2);
    await render(hbs`{{t 'html.greeting' name="<em>Jason</em>" count=42000}}`);
    assert.equal(this.element.querySelectorAll('em').length, 0);
    assert.equal(this.element.querySelectorAll('strong').length, 0);
  });

  test('should support allowEmpty', async function(assert) {
    assert.expect(1);
    await render(hbs`{{t allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
  });

  test('locale can add message to intl service and read it', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { oh: 'hai!' });
    await render(hbs`{{t 'oh'}}`);
    assert.equal(this.element.textContent, 'hai!');
  });

  test('translation value can be an empty string', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { empty_translation: '' });
    await render(hbs`{{t 'empty_translation'}}`);
    assert.equal(this.element.textContent, '');
  });

  test('locale can add messages object and can read it', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { bulk_add: 'bulk add works' });
    await render(hbs`{{t 'bulk_add'}}`);
    assert.equal(this.element.textContent, 'bulk add works');
  });

  test('can inline locale for missing locale', async function(assert) {
    assert.expect(1);
    await render(hbs`{{t 'foo.bar' locale='xx-xx'}}`);
    assert.equal(this.element.textContent, `Missing translation "foo.bar" for locale "xx-xx"`);
  });

  test('warns when no locale has been set', async function(assert) {
    assert.expect(1);
    this.intl.set('locale', null);
    await render(hbs`{{t 'foo.bar'}}`);
    assert.equal(this.element.textContent, `No locale defined.  Unable to resolve translation: "foo.bar"`);
  });

  test('should cascade translation keys', async function(assert) {
    assert.expect(1);
    this.intl.addTranslations('en-us', { happy_birthday: 'You are {age, number} years old!' });
    await render(hbs`{{t 'does.not.exist' default='happy_birthday' age=10}}`);
    assert.equal(this.element.textContent, 'You are 10 years old!');
  });

  test('should short format numbers', async function(assert) {
    assert.expect(1);
    this.intl.addTranslations('en-us', { cheese: 'Swiss cheese has {holes, shortNumber} holes in it!' });
    await render(hbs`{{t 'cheese' holes=10000}}`);
    assert.equal(this.element.textContent, 'Swiss cheese has 10K holes in it!');
  });
});
