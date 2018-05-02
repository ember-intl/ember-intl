import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import tHelper from 'ember-intl/helpers/t';

const DEFAULT_LOCALE_NAME = 'en-us';

module('t', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.addTranslations(DEFAULT_LOCALE_NAME, {
      html: {
        greeting: '<strong>Hello {name} {count, number}</strong>'
      },
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz'
      }
    });

    this.owner.register('formats:main', {
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
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(tHelper);
  });

  test('should return nothing if key does not exist and allowEmpty is set to true', async function(assert) {
    assert.expect(1);
    await render(hbs`{{t 'does.not.exist' allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
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

  test('locale can add message to intl service and read it', async function(assert) {
    assert.expect(1);

    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'oh', 'hai!');
    await render(hbs`{{t 'oh'}}`);
    assert.equal(this.element.textContent, 'hai!');
  });

  test('translation value can be an empty string', async function(assert) {
    assert.expect(1);

    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'empty_translation', '');
    await render(hbs`{{t 'empty_translation'}}`);
    assert.equal(this.element.textContent, '');
  });

  test('locale can add messages object and can read it', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(DEFAULT_LOCALE_NAME, { 'bulk-add': 'bulk add works' });
    await render(hbs`{{t 'bulk-add'}}`);
    assert.equal(this.element.textContent, 'bulk add works');
  });

  test('can inline locale for missing locale', async function(assert) {
    assert.expect(1);
    await render(hbs`{{t 'foo.bar' locale='xx-xx'}}`);
    assert.equal(this.element.textContent, `Missing translation "foo.bar" for locale "xx-xx"`);
  });

  test('warns when no locale has been set', async function(assert) {
    assert.expect(1);
    this.intl.setLocale();
    await render(hbs`{{t 'foo.bar'}}`);
    assert.equal(this.element.textContent, `No locale defined.  Unable to resolve translation: "foo.bar"`);
  });

  test('should fallback to with defaultMessage when key not found', async function(assert) {
    assert.expect(1);
    this.day = 1390518044403;
    await render(hbs`{{t 'app.sale_begins' defaultMessage='Sale begins {day, date, shortWeekDay}' day=day}}`);
    assert.equal(this.element.textContent, 'Sale begins January 23, 2014');
  });

  test('should fallback to with fallback when key not found', async function(assert) {
    assert.expect(1);
    this.day = 1390518044403;
    await render(hbs`{{t 'app.sale_begins' fallback='Sale begins {day, date, shortWeekDay}' day=day}}`);
    assert.equal(this.element.textContent, 'Sale begins January 23, 2014');
  });
});
