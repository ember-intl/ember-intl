import { run as emberRun } from '@ember/runloop';

function runAppend(view) {
  emberRun(view, 'appendTo', '#qunit-fixture');
}

function runDestroy(destroyed) {
  if (destroyed) {
    emberRun(destroyed, 'destroy');
  }
}

export { runAppend, runDestroy };
