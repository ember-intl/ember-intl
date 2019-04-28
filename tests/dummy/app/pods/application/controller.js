import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  intl: service(),
  activeLocale: readOnly('intl.locale'),

  actions: {
    changeLocale(locale) {
      return this.intl.set('locale', locale);
    }
  }
});
