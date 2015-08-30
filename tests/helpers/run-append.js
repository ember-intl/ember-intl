import Ember from 'ember';

const { run:emberRun } = Ember;

function runAppend (view) {
  emberRun(view, 'appendTo', '#qunit-fixture');
}

function runDestroy (destroyed) {
  if (destroyed) {
    emberRun(destroyed, 'destroy');
  }
}

export {
  runAppend,
  runDestroy
};
