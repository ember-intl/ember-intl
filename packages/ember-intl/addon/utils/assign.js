import Ember from 'ember';

export default Ember.assign || function assignPolyfill(...objects) {
  return objects.reduce(Ember.merge);
};
