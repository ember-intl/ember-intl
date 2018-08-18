import { A } from '@ember/array';
import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

const now = new Date();
const yesterday = new Date(now).setDate(now.getDate() - 1);

export default class SmokeController extends Controller {
  @service
  intl;

  locales = A(['en-us', 'fr-fr', 'es-es']);
  num = 1000;
  yesterday = yesterday;

  @action
  changeLocale(locale) {
    this.get('intl').set('locale', locale);
  }
}
