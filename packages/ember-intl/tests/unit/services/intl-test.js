import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:intl', 'Unit | Service | intl', {
  integration: true,
  setup() {
    service = this.subject();
  }
});

test('triggers notifyPropertyChange only when locale changes', function(assert) {
  var count = 0;
  function handler() {
    ++count;
  }
  service.addObserver('locale', service, handler);
  service.setLocale('en');
  service.setLocale('en');
  service.setLocale(['en']);
  service.setLocale('fr');
  assert.equal(count, 2);
  assert.equal(service.get('locale'), 'fr');
  service.removeObserver('locale', service, handler);
});

test('it does not mutate t options hash', function(assert) {
  service.setLocale('en');
  let obj = { bar: 'bar' };
  service.t('foo', obj);
  assert.ok(typeof obj.locale === 'undefined');
});

test('`t` can be passed a null options hash', function(assert) {
  service.setLocale('en');
  service.t('foo', undefined);
  assert.ok(true, 'Exception was not raised');
});
