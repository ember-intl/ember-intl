import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  intl: service(),
  locales: A(['en-us', 'fr-fr', 'es-es']),
  num: 1000,
  actions: {
    changeLocale(locale) {
      this.get('intl').setLocale(locale);
    },
  },

  namespacesAreActive: computed(function () {
    return this.get('intl').exists('subdirectory.smoke.subdirectory');
  }),
});
