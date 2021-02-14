import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class extends Route {
  @service intl;
  beforeModel() {
    this.intl.setLocale(['en-us']);
  }
}
