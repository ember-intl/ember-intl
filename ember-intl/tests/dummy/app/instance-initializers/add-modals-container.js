import ENV from 'dummy/config/environment';
import initialize from 'ember-modal-dialog/instance-initializers/add-modals-container';

export default {
  name: 'add-modals-container',
  initialize(appInstance) {
    if (ENV.environment === 'test') {
      return;
    }

    return initialize(appInstance);
  },
};
