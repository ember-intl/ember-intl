import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  intl: service(),
  actions: {
    changeLocale(locale) {
      return this.intl.set('locale', locale);
    }
  }
});
