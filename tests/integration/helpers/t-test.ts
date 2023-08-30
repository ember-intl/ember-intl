import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type IntlService from 'ember-intl/services/intl';
import type { TestContext as BaseTestContext } from 'ember-intl/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  translatedGreeting?: string;
}

module('Integration | Helper | t', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    'en-us',
    {
      html: {
        greeting: "'<strong>'Hello {name} {count, number}'</strong>'",
        legacy: `<a href="{href}">{text}</a>`,
      },
      number: 2,
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz',
      },
    },
    {
      missingMessage: false,
      formats: {
        date: {
          shortWeekDay: {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
    },
  );

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl') as IntlService;
  });

  test('should return nothing if key does not exist and allowEmpty is set to true', async function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      empty: '',
    });

    await render(hbs`
      {{t 'does.not.exist' default='empty'}}
    `);

    assert.dom().hasText('');
  });

  test('should return a number string if translation is a number', async function (assert) {
    await render(hbs`
      {{t 'number'}}
    `);

    assert.dom().hasText('2');
  });

  test('should escape attributes but not the translation string', async function (this: TestContext, assert) {
    await render(hbs`
      {{t 'html.greeting' htmlSafe=true name="<em>Jason</em>" count=42000}}
    `);

    assert.dom('strong').exists({ count: 1 });
    assert.dom('em').exists({ count: 0 });

    assert.strictEqual(
      // @ts-expect-error: this.element exists
      (this.element as HTMLElement).innerHTML.trim(),
      `<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>`,
    );
  });

  test('should support legacy HTML escaping', async function (this: TestContext, assert) {
    await render(hbs`
      {{t 'html.legacy' htmlSafe=true text="<em>Jason</em>" href="/foo"}}
    `);

    assert.dom('a').exists({ count: 1 });
    assert.dom('em').exists({ count: 0 });

    assert.strictEqual(
      // @ts-expect-error: this.element exists
      (this.element as HTMLElement).innerHTML.trim(),
      `<a href="/foo">&lt;em&gt;Jason&lt;/em&gt;</a>`,
    );
  });

  test('should support optional positional options object argument', async function (this: TestContext, assert) {
    await render(hbs`
      {{t 'html.greeting' (hash name="Jason" count=42)}}
    `);

    assert.strictEqual(
      // @ts-expect-error: this.element exists
      (this.element as HTMLElement).textContent.trim(),
      `<strong>Hello Jason 42</strong>`,
    );
  });

  test('should overried optional positional options argument properties with named arguments', async function (this: TestContext, assert) {
    await render(hbs`
      {{t 'html.greeting' (hash name="Jason" count=42) count=39.99}}
    `);

    assert.strictEqual(
      // @ts-expect-error: this.element exists
      (this.element as HTMLElement).textContent.trim(),
      `<strong>Hello Jason 39.99</strong>`,
    );
  });

  test('should render a TextNode', async function (this: TestContext, assert) {
    await render(hbs`
      {{t 'html.greeting' name="<em>Jason</em>" count=42000}}
    `);

    assert.dom('em').exists({ count: 0 });
    assert.dom('strong').exists({ count: 0 });
  });

  test('should support allowEmpty', async function (this: TestContext, assert) {
    await render(hbs`
      {{t allowEmpty=true}}
    `);

    assert.dom().hasText('');
  });

  test('locale can add message to intl service and read it', async function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      oh: 'hai!',
    });

    await render(hbs`
      {{t 'oh'}}
    `);

    assert.dom().hasText('hai!');
  });

  test('translation value can be an empty string', async function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      empty_translation: '',
    });

    await render(hbs`
      {{t 'empty_translation'}}
    `);

    assert.dom().hasText('');
  });

  test('locale can add messages object and can read it', async function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      bulk_add: 'bulk add works',
    });

    await render(hbs`
      {{t 'bulk_add'}}
    `);

    assert.dom().hasText('bulk add works');
  });

  test('can inline locale for missing locale', async function (this: TestContext, assert) {
    await render(hbs`
      {{t 'foo.bar' locale='fr'}}
    `);

    assert.dom().hasText('Missing translation "foo.bar" for locale "fr"');
  });

  test('warns when no locale has been set', async function (this: TestContext, assert) {
    // @ts-expect-error This is undesired private behavior.
    assert.throws(() => this.intl.setLocale(null), /no locale has been set/);
  });

  test('should cascade translation keys', async function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      happy_birthday: 'You are {age, number} years old!',
    });

    await render(hbs`
      {{t 'does.not.exist' default='happy_birthday' age=10}}
    `);

    assert.dom().hasText('You are 10 years old!');
  });

  test('should throw when unknown key type is provided', async function (this: TestContext, assert) {
    const assertInvalidTranslationKey = (input: unknown) => {
      let error;

      try {
        this.intl.t(input as any);
      } catch (e) {
        error = e;
      }

      assert.true(error.message.includes('expected translation key'));
    };

    assertInvalidTranslationKey(null);
    assertInvalidTranslationKey(undefined);
    assertInvalidTranslationKey(false);
    assertInvalidTranslationKey([]);
    assertInvalidTranslationKey({});
    assertInvalidTranslationKey(1);
  });

  // Autotracking was added in Ember 3.13, so this test isn't applicable to earlier versions
  test('current locale entangles with autotracking', async function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', { greeting: 'Hello' });
    this.intl.addTranslations('fr-fr', { greeting: 'Bonjour' });

    // Define a native getter that calls intl.t()
    Object.defineProperty(this, 'translatedGreeting', {
      get() {
        return this.intl.t('greeting');
      },
    });

    this.intl.setLocale(['en-us']);

    await render<TestContext>(hbs`{{this.translatedGreeting}}`);

    assert.dom().hasText('Hello');

    this.intl.setLocale(['fr-fr']);

    await settled();

    assert.dom().hasText('Bonjour');
  });
});
