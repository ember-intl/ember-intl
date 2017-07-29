import { assert } from '@ember/debug';
import { run } from '@ember/runloop';
import Ember from 'ember';

const { Test } = Ember;

export default function expectError(fn, handler) {
  assert('Error handler must be provided to expectError', typeof handler === 'function');

  let lastError = null;
  let adapter = Test.adapter;

  let TestAdapter = Test.adapter.constructor.extend({
    exception(error) {
      lastError = error;
    }
  });

  run(() => (Test.adapter = TestAdapter.create()));

  try {
    fn();
  } catch (error) {
    lastError = error;
  }

  run(Test.adapter, 'destroy');
  Test.adapter = adapter;

  if (lastError) {
    return handler(lastError);
  }

  throw new Error(`No error was thrown from within "${fn}"`);
}
