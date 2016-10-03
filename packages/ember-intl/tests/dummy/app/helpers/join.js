import Ember from 'ember';

export function listLimiter([list, delimiter]) {
  return list.join(delimiter);
}

export default Ember.Helper.helper(listLimiter);
