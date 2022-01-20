import Ember from 'ember';
import initialize from 'ember-modal-dialog/instance-initializers/add-modals-container';

export default {
  name: 'add-modals-container',
  initialize(appInstance) {
    if (Ember.testing) return;
    return initialize(appInstance);
  },
};
