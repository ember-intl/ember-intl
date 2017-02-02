import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import Translation from 'ember-intl/models/translation';

const locale = 'en-us';
let service, registry;

moduleForComponent('format-block', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');

    registry.injection('formatter', 'intl', 'service:intl');

    registry.register('ember-intl@translation:en-us', Translation.extend({
      withoutYield: 'Hello',
      start: '{yield} with love',
      middle: 'from {yield} to you',
      end: 'hello {yield}'
    }));

    service.setLocale(locale);
  }
});

test('should throw error if no key', function(assert) {
  assert.expect(1);
  assert.throws(() => {
    this.render(hbs`{{#format-block ''}}{{/format-block}}`);
  }, new Error('No translation specified.'));
});

test('should render with no yield', function(assert) {
  assert.expect(1);
  this.render(hbs`{{#format-block t='withoutYield'}}{{/format-block}}`);

  assert.equal(this.$().text().trim(), 'Hello');
});

test('should render with yield in the beginning', function(assert) {
  assert.expect(1);
  this.render(hbs`{{#format-block t='start'}}from ember{{/format-block}}`);

  assert.equal(this.$().text().trim(), `from ember with love`);
});

test('should render with yield in the middle', function(assert) {
  assert.expect(1);
  this.render(hbs`{{#format-block t='middle'}}Santa{{/format-block}}`);

  assert.equal(this.$().text().trim(), `from Santa to you`);
});

test('should render with yield in the end', function(assert) {
  assert.expect(1);
  this.render(hbs`{{#format-block t='end'}}Santa{{/format-block}}`);

  assert.equal(this.$().text().trim(), `hello Santa`);
});
