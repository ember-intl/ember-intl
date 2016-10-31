import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

const { run:emberRun } = Ember;

function contains(assert, selector, string) {
  const element = find(selector)[0];

  if (!element) {
    return assert.ok(false, `can't find element: ${selector}`);
  }

  const text = element.textContent || element.innerText;
  return assert.equal(text.replace(/^\s+|\s+$/g, ''), string);
}

module('Acceptance: Smoke', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    if (application) {
      emberRun(application, 'destroy');
    }
  }
});

test('format-number', (assert) => {
  visit('/smoke');

  andThen(() => {
    contains(assert, '.format-number', '€1,000.00');
  });
});

test('format-date', (assert) => {
  visit('/smoke');

  andThen(() => {
    contains(assert, '.format-date', '1/23/2014');
  });
});

test('format-time', (assert) => {
  visit('/smoke');

  andThen(() => {
    contains(assert, '.format-time', '18:00:44');
  });
});

test('format-relative', (assert) => {
  visit('/smoke');

  andThen(() => {
    contains(assert, '.format-relative', 'yesterday');
  });
});

test('translation-subdirectory', (assert) => {
  visit('/smoke');

  andThen(() => {
    contains(assert, '.translation-subdirectory', 'translation subdirectories loaded');
  });
});
