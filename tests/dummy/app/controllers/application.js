import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  intl: service(),
  locales: A(['en-us', 'fr-fr', 'es-es']),
  actions: {
    changeLocale(locale) {
      this.get('intl').setLocale(locale);
    }
  }
});
