import Ember from 'ember';

export default function(a, b) {
  if (!Ember.isArray(a) || !Ember.isArray(b)) { return false; }
  if (a === b) { return true; }

  return a.toString() === b.toString();
}
