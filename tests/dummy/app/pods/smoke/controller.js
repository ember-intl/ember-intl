import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

const now = new Date();
const yesterday = new Date(now).setDate(now.getDate() - 1);

export default Controller.extend({
  intl: service(),
  locales: A(['en-us', 'fr-fr', 'es-es']),
  num: 1000,
  yesterday: yesterday,
  actions: {
    changeLocale(locale) {
      this.get('intl').setLocale(locale);
    }
  },

  get namespacesAreActive() {
    return this.intl.exists("subdirectory.smoke.subdirectory");
  }
});
