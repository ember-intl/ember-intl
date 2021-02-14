import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @service intl;
  locales = A(['en-us', 'fr-fr', 'es-es']);
  num = 1000;

  @action
  changeLocale(locale) {
    this.intl.setLocale(locale);
  }

  get namespacesAreActive() {
    return this.intl.exists('subdirectory.smoke.subdirectory');
  }
}
