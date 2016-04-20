import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:intl', 'Unit | Service | intl', {
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
